export interface Service {
  id: string
  name: string
  description: string
  features: string[]
  icon: string
  callToAction: string
}

export interface ContactFormData {
  name: string
  email: string
  service: string
  message: string
}

export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  errors?: any[]
}