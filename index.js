const puppeteer = require('puppeteer')
const fs = require('fs')

const url = 'https://skins.guru/csgo/2'


async function run() {
    const browser = await puppeteer.launch()

    const page = await browser.newPage()
    await page.setDefaultTimeout(10000)
    await page.setViewport({ width: 1280, height: 720 })
    
    await page.goto(url)
    
    await page.waitForSelector('.items')

    const array = await page.$$eval('.item-inner', elements => elements.map(val => ({
        title: val.querySelector('.item-title a').textContent,
        price: val.querySelector('.item-price span').textContent
    })))

    await browser.close()

    // fs.writeFileSync('items.txt', array.join('\n'))
    array.forEach(val => console.log(val.title, val.price))
}

run()