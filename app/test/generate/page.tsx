import { getDistrict, getProvince, getWard } from "@/app/lib/getData";

export default async function Generate() {
  return (
    <div>

      <form action={getProvince}>
        <button type="submit">province</button>
      </form>
      <form action={getDistrict}>
        <button type="submit">district</button>
      </form>
      <form action={getWard}>
        <button type="submit">ward</button>
      </form>


    </div>
  )
}
