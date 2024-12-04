const filePath = "./in.txt"

try {
  const content = (await Deno.readTextFile(filePath)).replaceAll('\n', '')
  const regexp = /(mul\(\d{1,3},\d{1,3}\))|(do\(\))|(don't\(\))/g;
  const regNum = /\d{1,3}/g

  const Status = {
    Enable: "do()",
    Disabled: "don't()"
  }

  const array = [...content.matchAll(regexp)].map(i => i[0]);
  const pArray = array.map((item) => {
    if (item !== Status.Enable && item !== Status.Disabled) {
      const numbers = [...item.matchAll(regNum)].map(n => Number(n))
      return numbers[0] * numbers[1]
    }
    return item
  })

  let ans = 0;
  let enable = true

  for (const item of pArray) {
    if (typeof item === 'string') {
      enable = item === Status.Enable
    } else if (enable) {
      ans += item
    }
  }

  console.log(ans)
} catch (error) {
  console.log(error)
}
