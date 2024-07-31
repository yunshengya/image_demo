import GoEasy from 'goeasy'

export default class GoEasyUtil {

  // 初始化
  constructor() {
    this.goEasy = GoEasy.getInstance({
      host: "hangzhou.goeasy.io",
      appkey: 'BC-fdd25e37ab8c4d109cbaa701334b33d3', // 应用key
      modules: ['pubsub']
    })
  }
  // 获取单个实例
  static getInstanceEx () {
    if (!GoEasyUtil.instance) {
      GoEasyUtil.instance = new GoEasyUtil();
    }
    return GoEasyUtil.instance.goEasy;
  }
}