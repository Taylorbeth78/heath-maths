import React, { useRef, useEffect, useState } from 'react'

const COLOURS = ['#1a1a1a', '#2d6a2d', '#1a4b8c', '#c9a227', '#cc0000', '#ffffff']
const SIZES = [2, 5, 10, 18]

export default function Whiteboard() {
  const canvasRef = useRef(null)
  const [drawing, setDrawing] = useState(false)
  const [colour, setColour] = useState('#1a1a1a')
  const [size, setSize] = useState(5)
  const [tool, setTool] = useState('pen') // pen or eraser
  const [history, setHistory] = useState([])
  const lastPos = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  const getPos = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const source = e.touches ? e.touches[0] : e
    return { x: source.clientX - rect.left, y: source.clientY - rect.top }
  }

  const startDraw = (e) => {
    e.preventDefault()
    setDrawing(true)
    lastPos.current = getPos(e)
    // Save state for undo
    const canvas = canvasRef.current
    setHistory(h => [...h.slice(-19), canvas.toDataURL()])
  }

  const draw = (e) => {
    e.preventDefault()
    if (!drawing) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const pos = getPos(e)

    ctx.beginPath()
    ctx.moveTo(lastPos.current.x, lastPos.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = tool === 'eraser' ? 'white' : colour
    ctx.lineWidth = tool === 'eraser' ? size * 4 : size
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
    lastPos.current = pos
  }

  const stopDraw = () => setDrawing(false)

  const undo = () => {
    if (history.length === 0) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const prev = history[history.length - 1]
    const img = new Image()
    img.onload = () => ctx.drawImage(img, 0, 0)
    img.src = prev
    setHistory(h => h.slice(0, -1))
  }

  const clearBoard = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    setHistory(h => [...h, canvas.toDataURL()])
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const download = () => {
    const canvas = canvasRef.current
    const link = document.createElement('a')
    link.download = 'whiteboard.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  const btnStyle = (active) => ({
    padding: '8px 14px', fontSize: '13px', fontWeight: '500',
    border: `2px solid ${active ? 'var(--green)' : 'var(--border)'}`,
    background: active ? 'var(--green-light)' : 'white',
    color: active ? 'var(--green-dark)' : 'var(--text)',
    borderRadius: '7px', cursor: 'pointer',
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 56px - 56px)', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '600' }}>Maths Whiteboard</h1>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Tool */}
          <button style={btnStyle(tool === 'pen')} onClick={() => setTool('pen')}>✏️ Pen</button>
          <button style={btnStyle(tool === 'eraser')} onClick={() => setTool('eraser')}>🧹 Eraser</button>

          {/* Colours */}
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '0 4px' }}>
            {COLOURS.map(c => (
              <button key={c} onClick={() => { setColour(c); setTool('pen') }}
                style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  background: c, border: colour === c && tool === 'pen' ? '3px solid var(--green)' : '2px solid var(--border)',
                  cursor: 'pointer', padding: 0,
                }} />
            ))}
          </div>

          {/* Sizes */}
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            {SIZES.map(s => (
              <button key={s} onClick={() => setSize(s)}
                style={{
                  width: '32px', height: '32px', borderRadius: '7px',
                  border: size === s ? '2px solid var(--green)' : '1px solid var(--border)',
                  background: size === s ? 'var(--green-light)' : 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                }}>
                <div style={{ width: s + 2, height: s + 2, borderRadius: '50%', background: 'var(--text)' }} />
              </button>
            ))}
          </div>

          <button onClick={undo} style={btnStyle(false)} disabled={history.length === 0}>↩ Undo</button>
          <button onClick={clearBoard} style={btnStyle(false)}>🗑 Clear</button>
          <button onClick={download} style={{ ...btnStyle(false), background: 'var(--green)', color: 'white', border: '2px solid var(--green)' }}>
            ⬇ Save
          </button>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        style={{
          flex: 1, width: '100%', borderRadius: '12px',
          border: '2px solid var(--border)', cursor: tool === 'eraser' ? 'cell' : 'crosshair',
          touchAction: 'none',
        }}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={stopDraw}
      />
    </div>
  )
}
