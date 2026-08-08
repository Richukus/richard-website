precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

#define NUM_BALLS 8

float hash(float n)
{
    return fract(sin(n) * 43758.5453123);
}

void main()
{
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    uv.x *= u_resolution.x / u_resolution.y;

    float field = 0.0;

    for(int i=0;i<NUM_BALLS;i++)
    {
        float fi = float(i);

        vec2 centre;

        centre.x = 0.5 + 0.35 *
            sin(u_time*0.23 + fi*2.31);

        centre.y = 0.5 + 0.35 *
            cos(u_time*0.37 + fi*1.73);

        centre.x *= u_resolution.x/u_resolution.y;

        float r = 0.045 + hash(fi)*0.03;

        float d = length(uv-centre);

        field += (r*r)/(d*d + 0.0005);
    }

    float metaball = smoothstep(1.0,1.2,field);

    vec3 colour = mix(
        vec3(0.03,0.04,0.06),
        vec3(0.18,0.35,0.80),
        metaball
    );

    colour += field*0.02;

    gl_FragColor = vec4(colour,1.0);
}