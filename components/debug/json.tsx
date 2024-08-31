type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONArray
  | JSONObject
  | Date

// eslint-disable-next-line prettier/prettier
interface JSONArray extends Array<JSONValue> { }

interface JSONObject {
  [key: string]: JSONValue
}

type Props = {
  object: JSONObject
}

export const JsonRenderer = ({ object }: Props) => {
  return <pre>{JSON.stringify(object, null, 2)}</pre>
}
