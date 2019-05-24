//const add =require('../conn');
//const {expect} =require('chai');
//describe("数据库连接的测试",()=>{
   // it('llll',()=>{
        
    //})
//})
var add = require('../conn.js');
var expect = require('chai').expect;

describe('加法函数的测试', function() {
  it('1 加 1 应该等于 2', function() {
    expect(add(1, 1)).to.be.equal(2);
  });
});