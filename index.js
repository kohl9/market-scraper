const puppeteer = require('puppeteer')
const fs = require('fs')

const url = 'https://skins.guru/csgo/2'
let array = []

async function run() {
    const browser = await puppeteer.launch()

    const page = await browser.newPage()
    await page.setDefaultTimeout(10000)
    await page.setViewport({ width: 1280, height: 720 })
    
    await page.goto(url)
    
    let countOfPages = await page.$eval('.pagination-info', elem => elem.textContent)

    for (let i = 2; i <= parseInt(countOfPages.slice(14)) + 1; i++) {
        await page.waitForSelector('.items')

        let interArray = await page.$$eval('.item-inner', elements => elements.map(val => ({
            title: val.querySelector('.item-title a').textContent,
            price: val.querySelector('.item-price span').textContent
        })))

        array = array.concat(interArray)

        await page.goto(`https://skins.guru/csgo/2?page=${i}`)
    }

    await browser.close()

    // fs.writeFileSync('items.txt', array.join('\n'))
    array.forEach(val => console.log(val.title, val.price))
}

run()