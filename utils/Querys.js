//export const GET_URL = 'http://192.168.1.103/logi-master/ApiLogi/principal_graph.php'

//export const GET_URL = 'http://192.168.0.6/logi-master/ApiLogi/principal_graph.php'

export const GET_URL = 'https://grupologi.com.co/ApiLogi/principal_graph.php'


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

export const GET_AENV_ID = (guia) => `
{
  a_envio_x_guia_op(num_guia_op: "${guia}"){
    aen_id
    op_datos{
      ope_nombre
    }
  }
}`

export const INSERT_EST_AENV = (id_aenv, estado, fechaHora, operador) => `
mutation{
  add_est_aenv_alm(aen_id: "${id_aenv}" esae_id: ${estado} fec_hora:"${fechaHora}" detalle: "Entregado a colecta ${operador}"){
    aen_id
  }
}`