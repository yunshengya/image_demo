import { AxiosAPI } from '@/application/server/axiosApi/_axios';

// 获取随机一言
export async function axiosRand(data: any): Promise<any> {
  return await AxiosAPI.get('https://api.vvhan.com/api/ian/rand', data);
}
// 获取随机头像
export async function axiosImgRand(data: any): Promise<any> {
  return await AxiosAPI.get('https://api.vvhan.com/api/avatar/rand?type=json', data);
}
// 获取随机
export async function axiosImgBuy():Promise<any>{
  return await AxiosAPI.get('https://api.dzzui.com/api/imgtaobao?format=json')
}