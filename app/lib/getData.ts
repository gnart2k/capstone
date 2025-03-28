"use server"
import prismadb from "@/lib/prisma";
import { GHN_DISTRICT_URL, GHN_PROVINCE_URL, GHN_WARD_URL } from "./const";
import { DistrictType, ProvinceType, WardType } from "@/type/location";

export async function getProvince() {
  try {
    const response = await fetch(GHN_PROVINCE_URL, {
      method: 'GET',
      headers: {
        'Token': process.env.GHN_TOKEN
      }
    })
    const data: ProvinceType = await response.json();
    data.data.map(async (e) => {
      const result = await prismadb.province.create({
        data: {
          id: +e.ProvinceID,
          provinceName: e.ProvinceName
        }
      })
      console.log(result)
    })
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getDistrict() {
  try {
    const response = await fetch(GHN_DISTRICT_URL + ``, {
      method: 'GET',
      headers: {
        'Token': process.env.GHN_TOKEN
      },
    })
    const data: DistrictType = await response.json();
    for (const e of data?.data) {
      try {

        const result = await prismadb.district.create({
          data: {
            id: +e.DistrictID,
            districtName: e.DistrictName,
            provinceId: +e.ProvinceID
          }
        })
        await Promise.all([
          result,
          timeout(10)
        ])

        console.log(result)
      } catch (err) {
        continue
      }


    }

    // data.data.map(async (e) => {
    //   const result = await prismadb.district.create({
    //     data: {
    //       id: +e.DistrictID,
    //       districtName: e.DistrictName,
    //       provinceId: +e.ProvinceID
    //     }
    //   })
    //   console.log(result)
    // })
  } catch (error) {
    console.error('Error:', error);
  }
}

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



export async function getWard() {
  try {
    const district = await prismadb.district.findMany({
    })
    for (const d of district) {
      const response = await fetch(`${GHN_WARD_URL}?district_id=${d.id}`, {
        method: 'GET',
        headers: {
          'Token': process.env.GHN_TOKEN
        },
      })
      await Promise.all([
        response,
        timeout(10)
      ])
      if (response.status < 400) {
        const data: WardType = await response.json();
        console.log(d.provinceId)
        if (data?.data) {
          for (const e of data?.data) {
            if (e?.WardCode && e?.WardName) {
              try {
                const result = await prismadb.ward.create({
                  data: {
                    wardCode: e.WardCode ? e.WardCode + "" : e.WardName,
                    districtId: d.id,
                    wardName: e.WardName
                  }
                })
                console.log(result)
              } catch (err) {
                continue
              }
            }
          }
        }
      }
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

