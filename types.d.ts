type StationInfo = {
  act: string;
  ar: string;
  aren: string;
  bemp: number;
  infoDate: string;
  infoTime: string;
  lat: number;
  lng: number;
  mday: string;
  sarea: string;
  sareaen: string;
  sbi: number;
  sna: string;
  snaen: string;
  sno: string;
  srcUpdateTime: string;
  tot: number;
  updateTime: string;
};

type Exmple = {
  sno: '500101001';
  sna: 'YouBike2.0_捷運科技大樓站';
  tot: 28; //場站總停車格
  sbi: 2; //場站目前車輛數量
  sarea: '大安區';
  mday: '2023-06-13 11:05:14';
  lat: 25.02605;
  lng: 121.5436;
  ar: '復興南路二段235號前';
  sareaen: 'Daan Dist.';
  snaen: 'YouBike2.0_MRT Technology Bldg. Sta.';
  aren: 'No.235， Sec. 2， Fuxing S. Rd.';
  bemp: 26; // 空位數量
  act: '1'; // 全站禁用狀態(0:禁用、1:啟用)
  srcUpdateTime: '2023-06-13 11:05:34';
  updateTime: '2023-06-13 11:05:51';
  infoTime: '2023-06-13 11:05:14';
  infoDate: '2023-06-13';
};
