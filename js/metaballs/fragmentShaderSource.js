const canvas = document.getElementById("bg");
const gl = canvas.getContext("webgl");

if (!gl) {
  alert("WebGL not supported");
}

//-----------------------------------------------------
// Resize
//-----------------------------------------------------

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  gl.viewport(0, 0, canvas.width, canvas.height);
}

window.addEventListener("resize", resize);
resize();

//-----------------------------------------------------
// Shader compilation
//-----------------------------------------------------

function createShader(type, source) {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, source);

  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));

    gl.deleteShader(shader);

    return null;
  }

  return shader;
}

const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);

const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

//-----------------------------------------------------
// Program
//-----------------------------------------------------

const program = gl.createProgram();

gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  console.error(gl.getProgramInfoLog(program));
}

gl.useProgram(program);

//-----------------------------------------------------
// Fullscreen Quad
//-----------------------------------------------------

const vertices = new Float32Array([
  -1, -1, 1, -1, -1, 1,

  -1, 1, 1, -1, 1, 1,
]);

const vertexBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const positionLocation = gl.getAttribLocation(program, "a_position");

gl.enableVertexAttribArray(positionLocation);

gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

//-----------------------------------------------------
// Uniforms
//-----------------------------------------------------

const timeLocation = gl.getUniformLocation(program, "u_time");

const resolutionLocation = gl.getUniformLocation(program, "u_resolution");

//-----------------------------------------------------
// Render Loop
//-----------------------------------------------------

function render(time) {
  gl.uniform1f(timeLocation, time * 0.001);

  gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

  gl.drawArrays(gl.TRIANGLES, 0, 6);

  requestAnimationFrame(render);
}

requestAnimationFrame(render);
