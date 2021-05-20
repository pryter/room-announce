import Error from "next/error";

export default function Index() {

  return (
    <Error statusCode={404}/>
  )
}
