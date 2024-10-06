attribute vec2 a_position;
attribute vec3 a_color;
uniform mat4 u_matrix;
varying vec3 v_color;

void main() {
    gl_PointSize = 3.0;
    gl_Position = u_matrix * vec4(a_position, 0.0, 1.0);
    v_color = a_color;
}
