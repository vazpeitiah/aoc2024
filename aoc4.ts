const filePath = "./in.txt"

const regexp = /XMAS/g;

const foundItems = (...args: string[]): number => {
  console.log(args)
  return args.reduce((acc, curr) => {
    const r = curr.split('').reverse().join('')
    const icurr = [...curr.matchAll(regexp)].length
    const ir = [...r.matchAll(regexp)].length
    return acc + icurr + ir
  }, 0)
}

try {
  const content = (await Deno.readTextFile(filePath))
  const hlines = content.split('\n').slice(0, -1)
  console.log(hlines)
  const splitedLines = hlines.map(line => line.split(''))
  let vlines: string[] = []
  const lineLen = splitedLines[0].length

  for (let i = 0; i < lineLen; i++) {
    let line = ""
    for (let j = 0; j < splitedLines.length; j++) {
      line = line.concat(splitedLines[j][i])
    }
    vlines.push(line)
  }
  /*
  ..X...
  .samx.
  .a..a.
  xmas.s
  .x....

  0,0
  1,0 - 0,1
  2,0 - 1,1 - 0,2
  3,0 - 2,1 - 1,2 - 0,3
  4,0 - 3,1 - 2,2 - 1,3 - 0,4
  
  0,5
  1,5 - 0,4
  2,5 - 1,4 - 0,3
  3,5 - 2,4 - 1,3 - 0,2
  4,5 - 3,4 - 2,3 - 1,2 - 0-1

  4,0
  4,1 - 3,0
  4,2 - 3,1 - 2,0
  4,4 - 3,3 - 2,2 - 1,1 - 0,0
  4,5 - 3,4 - 2,3 - 1,2 - 0,1

  4,5
  4,4 - 3,5
  4,3 - 3,4 -
  */
  let trlines: string[] = []
  let tllines: string[] = []

  for (let i = 0; i < splitedLines.length; i++) {
    let line = ""
    let trline = ""
    for (let j = 0; j <= i; j++) {
      line = line.concat(splitedLines[i - j][j])
      trline = trline.concat(splitedLines[i - j][lineLen - j - 1])
    }
    trlines.push(line)
  }

  let brlines: string[] = []
  let bllines: string[] = []
  const slen = splitedLines.length

  for (let i = 0; i < lineLen; i++) {
    let blline = ""
    let brline = ""
    let buff = ""
    for (let j = 0; j <= i && j < slen; j++) {
      buff += `${splitedLines.length - j - 1},${lineLen - i - 1} - `
      brline = brline.concat(splitedLines[slen - j - 1][i - j])
      blline = blline.concat(splitedLines[slen - j - 1][lineLen - i - 1])
    }
    // console.log(buff.slice(0, -3))
    brlines.push(brline)
    bllines.push(blline)
  }

  //console.log(bllines)

  const ans = foundItems(...hlines, ...vlines, ...trlines, ...tllines, ...brlines, ...bllines)
  console.log(ans)
} catch (error) {
  console.log(error)
}
