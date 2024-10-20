varying vec3 vCol;

uniform int n;
uniform float a1;
uniform float a2;
uniform float r1;
uniform float r2;

#define M_PI 3.1415926535897932384626433832795

vec3 hsv2rgb(vec3 c)
{
vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main()
{
float t = float(gl_VertexID) / float(n);
vCol = hsv2rgb(vec3(t, 0.75, 0.75));
float theta = 2.0 * M_PI * t;
float x = r1 * cos(theta * a1) + r2 * cos(theta * a2);
float y = r1 * sin(theta * a1) + r2 * sin(theta * a2);
gl_Position = vec4(x, y, 0.0, 1.0);
}
