const filePath = "./in.txt"

try {
  const content = await Deno.readTextFile(filePath)
  const l: string[] = content.split('\n')

  let a: number[] = []
  let b: number[] = []
  const lines = l.slice(0, -1)
  const freq = new Map()

  lines.forEach((line, index) => {
    const partA = line.split('   ')[0]
    const partB = line.split('   ')[1]

    a.push(Number(partA))
    b.push(Number(partB))
  })

  b.forEach((i) => {
    if (freq.has(i)) {
      const prev = freq.get(i)
      freq.set(i, prev + 1)
      return
    }
    freq.set(i, 1)
  })

  //a.sort((a, b) => a - b)
  //b.sort((a, b) => a - b)

  /*let ans = 0;
  for (let i = 0; i < a.length; i++) {
    ans += Math.abs(a[i] - b[i])
  }
  console.log(ans)*/

  let ans = 0
  a.forEach((i) => {
    if (freq.has(i)) {
      ans += i * freq.get(i)
    }
  })
  console.log(ans)
} catch (error) {
  console.log(error)
}
