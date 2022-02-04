export const GET_URL = 'http://192.168.1.103/logi-master/ApiLogi/principal_graph.php'

export const GET_URL_IMG = 'http://192.168.1.103/logi-master/ApiLogi/controllers/image_photo.php'

//export const GET_URL = 'http://192.168.0.6/logi-master/ApiLogi/principal_graph.php'

//export const GET_URL_IMG = 'http://192.168.0.6/logi-master/ApiLogi/controllers/image_photo.php'

//export const GET_URL = 'http://grupologi.co/ApiLogi/principal_graph.php'

//export const GET_URL_IMG = 'http://grupologi.co/ApiLogi/controllers/image_photo.php'


export const GET_TOKEN = (usuario, password) => `
{
  emp_pass(usuario:"${usuario}" password:"${password}"){
    token
  }
}`

export const GET_DATA_PROFILE = `
{
  datos_emp_user{
    emp_nombre
    emp_email
  }
}`