import { Resource } from "./resource.model"

export interface User {
  id?: number
  name: string
  email: string
  is_admin: boolean
  created_at?: string
  updated_at?: string
  resource_permissions?: ResourcePermission[]
}

interface ResourcePermission {
  id?: number
  resource_id?: number
  view: boolean
  create: boolean
  update: boolean
  delete: boolean
  resource?: Resource
}
