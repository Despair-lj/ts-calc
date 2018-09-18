{
  enum action {
    add = '+',
    sub = '-',
    mul = '×',
    div = '÷',
    del = ''
  }

  class Calculator {
    public n1: string = '0'
    public n2: string = '0'
    public operator: action = action.del
    public result: string = ''
    public display: HTMLDivElement = document.createElement('div')
    public container: HTMLDivElement = document.createElement('div')
    public actionLists: Array<action> = [
      action.add,
      action.sub,
      action.mul,
      action.div
    ]
    public leftLists: Array<number | string> = [
      7,
      8,
      9,
      4,
      5,
      6,
      1,
      2,
      3,
      0,
      '.',
      'AC'
    ]
    public rightLists: Array<string> = ['=']

    constructor() {
      this.createContainer()
      this.createElements()
      this.createButtons()
      this.bindEvents()
    }

    createContainer() {
      this.container.classList.add('calc')
    }

    createElements() {
      this.display.classList.add('calculator__display')
      this.display.textContent = '0'
      this.container.appendChild(this.display)
    }

    createButtons() {
      const actions = document.createElement('div')
      actions.classList.add('calculator__keys-actions')
      this.actionLists.forEach((act: action) => {
        this.createButton(act, actions)
      })

      const bottomContainer = document.createElement('div')
      bottomContainer.classList.add('calculator__keys-bottom')
      const left = document.createElement('div')
      const right = document.createElement('div')
      left.classList.add('left')
      right.classList.add('right')
      this.leftLists.forEach((list: string | number) => {
        this.createButton(list, left)
      })
      this.rightLists.forEach((list: string | number) => {
        this.createButton(list, right)
      })
      bottomContainer.appendChild(left)
      bottomContainer.appendChild(right)
      this.container.appendChild(actions)
      this.container.appendChild(bottomContainer)
    }

    createButton(text: string | number, container: HTMLElement) {
      const button = document.createElement('button')
      button.textContent = `${text}`
      container.appendChild(button)
      document.body.appendChild(this.container)
    }

    bindEvents() {
      this.container.addEventListener('click', e => {
        if (e.target instanceof HTMLButtonElement) {
          const text: string = e.target.textContent || ''
          if (~'0123456789.'.indexOf(text)) {
            if (this.operator !== action.del) {
              this.n2 =
                ~this.n2.indexOf('.') && text === '.'
                  ? this.n2
                  : this.n2 === '0'
                    ? text === '.'
                      ? this.n2 + text
                      : text
                    : this.n2 + text
              this.display.textContent = this.n2
            } else {
              this.result = ''
              this.n1 =
                ~this.n1.indexOf('.') && text === '.'
                  ? this.n1
                  : this.n1 === '0'
                    ? text === '.'
                      ? this.n1 + text
                      : text
                    : this.n1 + text
              //this.n1 = this.n1 === '0' ? text : this.n1 + text
              this.display.textContent = this.n1
            }
          } else if (
            ~`${action.add}${action.sub}${action.mul},${action.div}`.indexOf(
              text
            )
          ) {
            if (this.result) {
              this.n1 = this.result
              this.result = ''
            }
            switch (text) {
              case action.add:
                this.operator = action.add
                break
              case action.sub:
                this.operator = action.sub
                break
              case action.mul:
                this.operator = action.mul
                break
              case action.div:
                this.operator = action.div
                break
            }
          } else if (~'='.indexOf(text)) {
            this.result = this.calc(this.n1, this.n2, this.operator)
            this.display.textContent = this.result
            this.n1 = '0'
            this.n2 = '0'
            this.operator = action.del
          } else if (text === 'AC') {
            this.n1 = '0'
            this.n2 = '0'
            this.operator = action.del
            this.result = ''
            this.display.textContent = '0'
          }
        }
      })
    }

    calc(n1: string, n2: string, operator: action) {
      console.log(n1, n2, operator)
      const numberN1: number = parseFloat(n1)
      const numberN2: number = parseFloat(n2)
      const n1DotAfterNum: number = this.dotAfterNumber(n1)
      const n2DotAfterNum: number = this.dotAfterNumber(n2)
      let maxNum

      switch (operator) {
        case action.add:
          maxNum = n1DotAfterNum > n2DotAfterNum ? n1DotAfterNum : n2DotAfterNum
          return (numberN1 + numberN2).toFixed(maxNum)
        case action.sub:
          maxNum = n1DotAfterNum > n2DotAfterNum ? n1DotAfterNum : n2DotAfterNum
          return (numberN1 - numberN2).toFixed(maxNum)
        case action.mul:
          maxNum =
            n1DotAfterNum !== 0
              ? n2DotAfterNum === 0
                ? n1DotAfterNum
                : n1DotAfterNum * n2DotAfterNum
              : n2DotAfterNum
          return (numberN1 * numberN2).toFixed(maxNum)
        case action.div:
          return numberN2 === 0
            ? "can't calc"
            : (numberN1 / numberN1).toFixed(10)
        case action.del:
          return `${numberN1 + numberN2}`
        default:
          return ''
      }
    }

    dotAfterNumber(str: string) {
      return ~str.indexOf('.') ? str.split('.')[1].length : 0
    }
  }

  new Calculator()
}
