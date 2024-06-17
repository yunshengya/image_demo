import { AxiosAPI } from '@/application/server/_axios';
const apiPath = { // API地址
  activity: '/' // 活动
};

export async function AxiosInsertStudent(data: any): Promise<any> {
  return AxiosAPI({
    url: `${apiPath.activity}student/insert`,
    method: 'post',
    data
  });
}

export async function AxiosList(params: any): Promise<any> {
  return AxiosAPI({
    url: `${apiPath.activity}student/list`,
    params
  });
}