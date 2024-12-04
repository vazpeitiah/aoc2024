const filePath = "./in.txt"

const isSafe = (a: number[]): boolean => {
  let r = true
  let isDesc = true
  let isAsc = true

  for (let i = 1; i < a.length && r; i++) {
    const diff = Math.abs(a[i - 1] - a[i])
    if (a[i - 1] > a[i]) {
      isAsc = false
    } else {
      isDesc = false
    }
    if (diff === 0 || diff > 3 || (!isAsc && !isDesc)) {
      r = false
    }
  }

  return r
}

const genSafeArrays = (a: number[]): Array<number[]> => {
  return a.map<number[]>((_, i) => {
    const nA = [...a]
    nA.splice(i, 1)
    return nA
  });
}

try {
  const content = await Deno.readTextFile(filePath)
  const lines: string[] = content.split('\n').slice(0, -1)

  let ans = 0;
  lines.forEach((line) => {
    const arr = line.split(' ').map((i) => Number(i))
    const possibleSafeArr = [...genSafeArrays(arr), arr]

    if (possibleSafeArr.some((pa) => isSafe(pa))) {
      ans++
    }
  })

  console.log(ans)
} catch (error) {
  console.log(error)
}
