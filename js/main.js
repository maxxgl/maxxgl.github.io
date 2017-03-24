document.body.style.backgroundColor = '#00001c'
var c = document.getElementById('mainCanvas')
var w = c.width = $('#canvasWrapper').innerWidth(),
    h = c.height = $('#canvasWrapper').innerHeight(),
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
    [107,129,178,129,126,152,126, 73, 55, 73, 83,107,152,152,143,138,122],
    [573,560,538,533,534,515,505,487,449,440,421,402,386,377,373,357,338,326,307,286,265,242,231,219,200,186,174,158,141,135,120,135,152,172,188,202,204,220,232,241,243,247,247,245,251,252,249,251,270,277,287,296,309,316,326,334,348,359,372,387,388,401,468,470,502,517,550,568],
    [297,316,339,347,364,348,339,337,339,352,352,365,361,361,377,376,380,383,376,365,336,336,331,329,318,316,307,302,294,292,296,291,284,281,286,288,266,252,244,232,226,243,256,268,270,274,280,283,285,288,291,293,293,292,289,298,300,297,300,295,303,309,309,311,311,307,305,305],
    [265,258,253,251,219,202],
    [336,317,295,283,288,288],
    [449,449,449,445],
    [339,321,318,309],
    [342,350,358,367,376,377],
    [299,313,322,329,333,363]
]

var starsX = [123,135,243,286,326,573,264,532,267,120,153,273,314,282,268,282,266,229,266,288,289,288,319,315,325,332,345,353,364,140,120,151,151,181,489,456,444,428,431,398,383,428,325,342,363,385,392,414,404,385]
var starsY = [279,292,226,365,289,297,314,303,204,296,260,127,107,129,178,129,126,152,126, 73, 55, 73, 83,107,152,152,143,138,122,233,204,191,165,149,219,211,194,177,155,141,161,177,239,251,259,252,265,250,241,252]
var starTwinkle = new Array(50)
var smoothTwinkle = new Array(50)
for (var i = 0; i < starTwinkle.length; i++) {starTwinkle[i] = Math.random() + 0.5}
for (var i = 0; i < smoothTwinkle.length; i++) {smoothTwinkle[i] = (Math.random() < 0.5 ? 0.075 : -0.075)}

var fieldX = [194,254,254,294,354,297,385,419,438,512,380,519,475,475,459,440,438,453,328,364,350,337,361,156,383,333,409, 62,220,175,303,252,538,514,359,275,405,468,483,443,358,125,348,394,303,178,82,53,46,294,543,580,210,509,306,115,124,169,147,332,159,86,262,402,427,540,610,601,506,314,433,458,476,473,255,225,143,109,129,85,28,25,87,147,201,142,78,84,61,38,19,62,57,56,83,190,240,276,367,397,297,294,356,471,456,528,561,556,455,426,487,471,544,378,499,387,447,140,262,314,342,476,464,499,487,550,483,429,373,373,359,277,286,294,219,153,195,71,88,36,144,72,139,208,202,206,292,401,489,557,591,616,557,604,553,471,515,610,633,566,541,549,580,572,556,535,520,407,360,328,300,258,221,199,190,305,389,407,341,221,161,111,105,227,323,397,457,347,261,142,66,54,91,180,283,397,466,512,410,281,139,100,297,387,361,319,305,309,303,270,205,388,512,496,404,331,323,321,281,208,101,225,335,418,409,415,481,534,557,552,537,489,452,360,292,238,170,128,85,47,31,42,125,325,321,162,107,232,245,385,464,341,534,502,451,342,254,233,357,467,509,414,299,204,141,152,233,280,319,359,396,420,477,428,595]
var fieldY = [300,269,303,370,345,308,321,327,283,324,246,158,283,281,270,279,243,321,216,226,231,187,-36,133,244,305,-50,278,387,421,459,495,387,455,435,496,370,349,167, -36,-20,44,275,129,20,-13,157,258,353,358,203,73,132,384,67,338,103,326,396,356,473,365,489,409,495,412,236,101,-20,-53,5,120,9,114,-25,-48,-3,76,144,123,151,128,42,-19,34,33,124,64,190,167,198,268,313,336,420,475,512,525,505,463,544,460,505,492,525,430,393,285,315,430,346,375,284,212,212,310,150,145,14,-19,-28,81,113,78,193,163,38,-6,78,-5,-28,54,-73,4,-51,25,93,147,214,317,352,296,359,419,487,495,524,514,473,434,389,277,253,352,393,356,267,222,199,149,228,272,220,189,142,95,61,-29,-37,-21,13,100,157,197,217,228,182,135,124,177,198,234,293,344,365,375,372,420,428,380,324,250,186,327,253,210,312,231,63,49,151,208,219,142,105,302,264,180,102,81,159,167,172,193,254,272,130,106,73,37,102,266,278,113,49,169,303,269,164,62,32,-1,-4,-19,-37,-39,-1,37,77,152,262,289,321,313,386,494,474,526,545,520,525,550,480,408,379,320,331,396,432,343,183,69,62,69,101,82,-28,-58,-81,-77,-49,-10,85,-50,141]
var fieldTwinkle = new Array(275)
for (var i = 0; i < fieldTwinkle.length; i++) {fieldTwinkle[i] = 0.5}

var pi = Math.PI
ctx.lineJoin='round'
ctx.lineWidth=2;
ctx.fillStyle = document.body.style.backgroundColor
ctx.strokeStyle = '#444'

ctx.beginPath();
// ctx.strokeStyle = '#024'
for (var i = 1*pi/16; i < 7*pi; i+=3*pi/4) {
    ctx.arc(350,350,330, i, i + 3*pi/8)
    ctx.arc(350,350,345, i + 3*pi/8, i + 3*pi/8*2)
}
ctx.stroke()

ctx.beginPath()
ctx.moveTo(670,350)
var ci = 325
for (var i = 0; i < 2*pi; i+=pi/8) {
    ctx.arc(350,350,ci, i, i)
    ci = (ci == 325 ? 240 : 325)
    ctx.arc(350,350,ci, i + pi + pi/8, i + pi + pi/8)
}
ctx.stroke()

for (var i = 0; i < 3; i+=2) {
    ctx.beginPath();
    for (var j = 0; j < points[i].length; j++) {
        ctx.lineTo(points[i][j] + 25, points[i + 1][j] + 110)
    }
    ctx.fill()
}


// Breathing ***************************************************

var cf = document.getElementById('fieldCanvas')
var w = cf.width = $('#canvasWrapper').innerWidth(),
    h = cf.height = $('#canvasWrapper').innerHeight(),
    ctf = cf.getContext('2d')
var outlineColor = 0x50
var colorStep = 0x1
ctf.lineJoin='round'
ctf.lineWidth=2;


angle = Math.random()*2*pi
function breathe() {
    ctf.strokeStyle = '#ccc'
    ctf.fillStyle = '#fff'
    ctf.clearRect(0, 0, cf.width, cf.height);
    for (var i = 0; i < fieldX.length; i++) {
        x = fieldX[i] - 325
        y = fieldY[i] - 239
        xPrime = Math.cos(angle)*x + Math.sin(angle)*y + 350
        yPrime = -Math.sin(angle)*x + Math.cos(angle)*y + 349
        ctf.beginPath()
        if (Math.random() < 0.1) {
            fieldTwinkle[i] = (fieldTwinkle[i]*3 + Math.random())/4
        }
        ctf.arc(xPrime, yPrime,fieldTwinkle[i],0,2*pi)
        ctf.fill()
        ctf.stroke();
    }
    angle+= 0.001

    ctf.strokeStyle = 'grey'
    for (var i = 4; i < points.length; i+=2) {
        ctf.beginPath();
        for (var j = 0; j < points[i].length; j++) {
            ctf.lineTo(points[i][j] + 25, points[i + 1][j] + 110)
        }
        ctf.stroke()
    }

    ctf.strokeStyle = 'rgb(0,' + Math.floor(outlineColor/2) +',' + outlineColor + ')'
    outlineColor = outlineColor + colorStep
    if (outlineColor > 0x68 || outlineColor < 0x38) {colorStep = colorStep * -0x1}
    for (var i = 0; i < 3; i+=2) {
        ctf.beginPath();
        for (var j = 0; j < points[i].length; j++) {
            ctf.lineTo(points[i][j] + 25, points[i + 1][j] + 110)
        }
        ctf.stroke()
    }

    ctf.strokeStyle = '#fff'
    ctf.fillStyle = '#ddd'
    for (var i = 0; i < starsX.length; i++) {
        ctf.beginPath()
        if (starTwinkle[i] > 1.75 || starTwinkle[i] < 0.5) {
            smoothTwinkle[i] = smoothTwinkle[i] * -1
        }
        starTwinkle[i] += smoothTwinkle[i]
        ctf.arc(starsX[i] + 25,starsY[i] + 110,starTwinkle[i],0,2*pi)
        ctf.fill()
        ctf.stroke()
    }
}
setInterval(breathe, 125)
