"use client"

import { useEffect, useRef } from "react"

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl')
    if (!gl) return

    function resize() {
      if (!canvas || !gl) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
    }
    
    resize()
    window.addEventListener('resize', resize)

    const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `
    
    const fragmentShaderSource = `
      precision highp float;
      uniform float iTime;
      uniform vec2 iResolution;
      mat2 rotate2d(float angle){
        float c = cos(angle), s = sin(angle);
        return mat2(c, -s, s, c);
      }
      float variation(vec2 v1, vec2 v2, float strength, float speed) {
        return sin(
            dot(normalize(v1), normalize(v2)) * strength + iTime * speed
        ) / 100.0;
      }
      vec3 paintCircle (vec2 uv, vec2 center, float rad, float width) {
        vec2 diff = center-uv;
        float len = length(diff);
        len += variation(diff, vec2(0.0, 1.0), 5.0, 2.0);
        len -= variation(diff, vec2(1.0, 0.0), 5.0, 2.0);
        float circle = smoothstep(rad-width, rad, len) - smoothstep(rad, rad+width, len);
        return vec3(circle);
      }
      void main() {
        vec2 uv = gl_FragCoord.xy / iResolution.xy;
        uv.x *= 1.5;
        uv.x -= 0.25;
        vec3 color = vec3(0.0);
        float radius = 0.35;
        vec2 center = vec2(0.5);
        color += paintCircle(uv, center, radius, 0.035);
        color += paintCircle(uv, center, radius - 0.018, 0.01);
        color += paintCircle(uv, center, radius + 0.018, 0.005);
        vec2 v = rotate2d(iTime) * uv;
        color *= vec3(v.x, v.y, 0.7-v.y*v.x);
        color += paintCircle(uv, center, radius, 0.003);
        gl_FragColor = vec4(color, 1.0);
      }
    `

    function compileShader(type: number, source: string) {
      if (!gl) throw new Error('WebGL context not available')
      const shader = gl.createShader(type)
      if (!shader) throw new Error('Failed to create shader')
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(shader) || 'Shader compilation failed')
      }
      return shader
    }

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource)
    const program = gl.createProgram()
    if (!program) throw new Error('Failed to create program')
    
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || 'Program linking failed')
    }
    
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]), gl.STATIC_DRAW)

    const aPosition = gl.getAttribLocation(program, 'aPosition')
    gl.enableVertexAttribArray(aPosition)
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)

    const iTimeLoc = gl.getUniformLocation(program, 'iTime')
    const iResLoc = gl.getUniformLocation(program, 'iResolution')

    let animationId: number

    function render(time: number) {
      if (!gl || !canvas) return
      gl.uniform1f(iTimeLoc, time * 0.001)
      gl.uniform2f(iResLoc, canvas.width, canvas.height)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      animationId = requestAnimationFrame(render)
    }
    
    animationId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', resize)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: '#111' }}
    />
  )
}
