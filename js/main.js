document.body.style.backgroundColor = '#000026'
var w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext('2d')

var points = [
    [565,565,563,551,548,542,542,554,557,548,540,536,531,525,524,530,528,537,505,513,510,514,507,482,472,455,438,426,417,412,402,394,388,384,384,372,338,316,308,289,284,269,257,241,216,230,226,210,196,187,189,173,147,112, 88, 68, 48, 20,  2,  3,  7, 18, 35, 55, 73, 83, 82, 86, 87, 83, 90, 91, 89, 80, 79, 93, 94, 85, 78, 71, 68, 74, 83, 93,108],
    [305,295,291,294,298,291,284,275,254,247,246,250,241,241,238,228,224,204,175,151,149,133,136,134,138,136,127,111, 90, 62, 46, 43, 48, 46, 38, 45, 42, 34, 48, 43, 45, 62, 67, 84, 89, 68, 64, 70, 80,100,111,124,143,156,166,181,201,230,258,274,280,279,264,251,243,236,240,237,239,245,243,246,251,261,263,251,255,263,263,266,275,281,276,284,284],
    [107,125,200,234,250,260,274,279,278,292,301,304,298,298,309,312,312,306,313,326,337,347,354,358,362,375,382,392,387,388,394,409,412,425,442,440,463,470,488,495,509,520,532,538,536,536,547,558,578,598,601,611,623,629,619,610,605,601,595,598,580,578,578,575,565,543,538,527,510,510,514,506,490,478,472,446,427,420,392,387,383,377,368,363,348,337,332,320,310,301,285,272,279,273,264,255,251,248,250,252,247,245,246,253,254,256,265,271,283,293,289,293,309,309,304,290,277,259,246,239,239,244,239,237,231,225,217,216,211,203,193,177,163,152,143,136,125,114,107],
    [284,307,330,350,348,352,351,359,370,372,381,402,415,421,414,424,424,436,446,428,410,384,383,378,384,380,366,369,379,386,384,372,361,352,358,352,354,339,339,341,345,357,366,366,354,345,346,356,351,354,352,357,357,350,339,339,343,352,351,344,328,311,297,291,295,300,295,299,294,269,262,266,264,271,275,273,276,274,292,286,286,292,297,290,294,296,294,274,257,251,249,249,241,242,248,255,266,266,252,238,235,228,226,230,236,238,229,216,206,201,197,196,195,190,186,183,187,194,208,212,219,226,217,214,221,223,229,234,239,238,248,256,258,256,260,269,275,278,284],
    [325,342,363,385,392,414,404,385],
    [239,251,259,252,265,250,241,252],
    [489,456,444,428,431,398,383,428],
    [219,211,194,177,155,141,161,177],
    [140,120,151,151,181],
    [233,204,191,165,149],
    [314,282,268,282,266,229,266,288,289,288,319,315,325,332,345,353,364],
    [107,129,178,129,126,152,126, 73, 55, 73, 83,107,152,152,143,138,122]
]

var starsX = [123,135,243,286,326,573,264,532,267,120,153,273,314,282,268,282,266,229,266,288,289,288,319,315,325,332,345,353,364,140,120,151,151,181,489,456,444,428,431,398,383,428,325,342,363,385,392,414,404,385]
var starsY = [279,292,226,365,289,297,314,303,204,296,260,127,107,129,178,129,126,152,126, 73, 55, 73, 83,107,152,152,143,138,122,233,204,191,165,149,219,211,194,177,155,141,161,177,239,251,259,252,265,250,241,252]

var pi = Math.PI
ctx.lineJoin='round'
ctx.lineWidth=2;

ctx.beginPath();
for (var i = 0; i < 2*pi; i+=pi/2/4) {
    ctx.arc(335,350,330,0 + i, pi/4/2 + i)
    ctx.arc(335,350,330,pi + pi/4/2 + i, pi + pi/4/2*2 + i)
    ctx.strokeStyle = '#222'
}
// ctx.fillStyle = '#003'
// ctx.fill()
ctx.stroke();

ctx.beginPath()
for (var i = 0.8; i > 0; i-=0.2) {
    ctx.arc(335,350,330*i,0,2*pi)
}
ctx.strokeStyle = '#222'
ctx.stroke();


for (var i = 0; i < points.length; i+=2) {
    ctx.beginPath();
    ctx.strokeStyle = (i < 3 ? 'goldenrod' : '#785807')
    ctx.moveTo(points[0]+10, points[0]+110)
    for (var j = 0; j < points[i].length; j++) {
        ctx.lineTo(points[i][j] + 10, points[i + 1][j] + 110)
    }
    ctx.fillStyle = '#000026'
    ctx.fill()
    ctx.stroke();
}

for (var i = 0; i < starsX.length; i++) {
    ctx.beginPath()
    ctx.arc(starsX[i] + 10,starsY[i] + 110,1.5,0,2*pi)
    ctx.strokeStyle = ('lightgoldenrodyellow')
    ctx.fillStyle = ('lightgoldenrodyellow')
    ctx.fill()
    ctx.stroke();
}
