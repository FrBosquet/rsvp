type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONArray
  | JSONObject
  | Date
  | undefined

// eslint-disable-next-line prettier/prettier
interface JSONArray extends Array<JSONValue> { }

interface JSONObject {
  [key: string]: JSONValue
}

type Props = {
  object: JSONObject | JSONObject[] | undefined
}

export const JsonRenderer = ({ object }: Props) => {
  if (!object) {
    return 'JSON object is empty'
  }

  return <pre>{JSON.stringify(object, null, 2)}</pre>
}
