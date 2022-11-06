const puppeteer = require('puppeteer');
var prompt = require('prompt');
var requests = require('requests')
var Window = require('window')
var window = new Window()
var express = require('express');
var app = express();


const rand_url = "https://www.galaxy.win/lottery-bet/SELF_MONEY_TREE";

async function initBrowser(){
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto(rand_url);
    return page;
}
// async function closeButton(page){
//     await page.$eval("span[class='ant-modal-close-x']" , elem => elem.click())
// }
async function login(page){
    await page.type("input[class='account']", '8921854740')
    await page.type("input[class='pwd']", '9846656958')
    // var verifyCode 


    // prompt.start();
    
    // prompt.get(['verifyCode'],async function (err, result) {
        // verifyCode =await result.verifyCode
        // await page.type("input[class='form_input code'", verifyCode)
        await page.$eval("button" , elem => elem.click())
        await page.$eval("button[class='ant-btn ant-btn-primary']" , elem => {  elem.click()})
        
        await page.goto(rand_url)

        var PrevIssue;
        var betAmount = 0.001;
        function bot()
        {
            try{
            var data;
            requests('https://earnpredict.com/earnservice.php')
                  .on('data',async function (chunk) {
                  data =await JSON.parse(chunk)
                  var CurrentBet =await data.data[0].predict;
                  var CurrentAmt =await (parseFloat(data.data[0].amount)/10).toFixed(2)

                  var CurrIssue =await data.data[0].issue;
                  var prevResult = await data.data[1].result;
                  console.log(CurrIssue);

                  if(PrevIssue != CurrIssue){

                    if(prevResult != 'fail')
                    {
                        betAmount = betAmount*2.5
                    }
                    if(prevResult == 'fail')
                    {
                        betAmount = .001
                    }
                        
                        PrevIssue = CurrIssue;
                        if(CurrentBet =='1'){ // even
                            const input = await page.$("input[class='ant-input ant-input-sm money-set ant-dropdown-trigger']")
                            await input.click({clickCount:3})
                            delay(3000)
                            await page.type("input[class='ant-input ant-input-sm money-set ant-dropdown-trigger']", betAmount.toString())
                            delay(3000)
                            await page.$eval("span[class='ball  TO     fill  TOODD']" , elem => {  elem.click()})
                            delay(1000)
                            await page.$eval("span[class='ball  TO     fill  TOEVEN']" , elem => {  elem.click()})
                            delay(3000)
                            await page.$eval("button[class='ant-btn submit-btn ant-btn-primary ant-btn-sm']" , elem => {  elem.click()})
                            delay(6000)
                            await page.$eval("button[class='ant-btn ant-btn-primary']" , elem => {  elem.click()})
                            delay(6000)
                            await page.$eval("button[class='ant-btn ant-btn-primary']" , elem => {  elem.click()})
                        }
                        else
                        { //odd
                            delay(3000)
                            const input = await page.$("input[class='ant-input ant-input-sm money-set ant-dropdown-trigger']")
                            await input.click({clickCount:3})
                            delay(3000)
                            await page.type("input[class='ant-input ant-input-sm money-set ant-dropdown-trigger']", betAmount.toString())
                            delay(3000)
                            await page.$eval("span[class='ball  TO     fill  TOEVEN']" , elem => {  elem.click()})
                            delay(1000)
                            await page.$eval("span[class='ball  TO     fill  TOODD']" , elem => {  elem.click()})
                            delay(3000)
                            await page.$eval("button[class='ant-btn submit-btn ant-btn-primary ant-btn-sm']" , elem => {  elem.click()})
                            delay(6000)
                            await page.$eval("button[class='ant-btn ant-btn-primary']" , elem => {  elem.click()})
                            delay(6000)
                            await page.$eval("button[class='ant-btn ant-btn-primary']" , elem => {  elem.click()})
                        }
                        
                    }
                    delay(2000)
                    bot()
                    
                })
            }catch(err){
                console.log(err);
                bot()
                }
        
        }
        bot()

    // })

}

async function openTree(page){
    await page.$eval("button[class='ant-btn-primary']" , elem => elem.click())
}



function delay(time)
{
    var timeOne = new Date()
    var timeTwo = new Date()
    while(timeTwo.valueOf() < timeOne.valueOf()+time)
    {
        timeTwo=new Date()
    }
}

async function submit(){
    const page = await initBrowser();
    // await closeButton(page);
    await login(page);
    // await openTree(page);
}
submit()