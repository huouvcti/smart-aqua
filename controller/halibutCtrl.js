"use strict"

const { env_var } = require("../env_var");

const halibutDAO = require("../model/simulator/halibutDAO");

const { paging } = require('./tool/paging');

const { fun } = require('./function/halibut');


const main = async (req, res) => {
    if(req.session.s_user_key){
        const parameters = {
            user_key: req.params.user_key,
            url: env_var.HOST
        }
        // if(env_var.HOST === "localhost"){
        //     parameters.url += ":" + env_var.S_PORT;
        // }

        console.log(req.session.s_user_key)
        console.log(req.params.user_key)

        if(parameters.user_key == req.session.s_user_key){
            res.render(`../views/simulator/halibut.ejs`, {parameters});
        } else{
            res.send(`<script>alert('잘못된 접근'); location.href='/simulator/halibut/${req.session.s_user_key}';</script>`);
        }

        
    } else{
        res.send("<script>location.href='/simulator/login';</script>");
    }
}

const show = {}

show.all = async (req, res) => {
    const user_key = req.session.s_user_key;

    const result = await halibutDAO.show.all(user_key);

    res.send(result);
}


const set = {}

set.temp = async (req, res) => {

    const temper_json = JSON.parse(req.body.json)
    const user_key = req.session.s_user_key;

    // 기존 데이터 삭제
    await halibutDAO.clear(user_key)


    // property name 변경
    const property_name = ['day', 'month', 'Temp']
    let size = (temper_json.length <= 365) ? temper_json.length : 365;
    
    for(let i=0; i<size; i++){
        let j=0;
        for(let prop in temper_json[i]){
            // console.log(prop);
            temper_json[i][property_name[j++]] = temper_json[i][prop]
            delete temper_json[i][prop];
        }

        // 한 줄씩 DB 저장
        await halibutDAO.set.Temp(temper_json[i], user_key)
    }
    console.log(temper_json)

    res.send(temper_json);
}

set.TF = async (req, res) => {
    const user_key = req.session.s_user_key;

    // TF는 모든 값이 동일
    const TF = req.body.TF;
    await halibutDAO.set.TF(TF, user_key);

    // 날짜마다 다른 값 들
    let Wg = []     // 개체 중량 g
    let TWg = []    // 총 중량 kg
    let FV = []     // 권장 사료량 kg

    let TGC = []    // 
    let FR = []     // 사료 공급률 %


    const Temp = await halibutDAO.get.Temp(user_key);
    
    


    // 초기 중량값은 입력값
    Wg[0] = req.body.early_W;

    for(let i=0; i<Temp.length; i++) {

        let parameters = {
            user_key: user_key
        };


        if(i != 0){
            Wg[i] = fun.F_w(Temp[i-1]['Temp'], TGC[i-1], Wg[i-1])    
        }

        TWg[i] = Wg[i]*TF/1000
        TGC[i] = fun.F_TGC("", Wg[i])
        FR[i] = fun.F_FR(Temp[i]['Temp'], Wg[i])
        FV[i] = fun.F_FV(FR[i], Wg[i], TF)


        parameters.Wg = Wg[i]
        parameters.TWg = TWg[i]
        parameters.FV = FV[i]
        parameters.day = i+1
        

        // console.log(parameters);

        // result.push(parameters);

        await halibutDAO.set.FV(parameters);
    }

    let result = await halibutDAO.show.right(user_key);


    // console.log(result);
    
    res.send(result);
    
    
    
}

module.exports = {
    main,
    show,
    set,

}