const sayHello = async function () {
  try {
    console.log('in service');
    return { success: true, message: 'request served successfully', code: 200 }
  } catch (err) {
    const { code, message, stack, ...restError } = err
    console.log(err)
  }
}

module.exports = {
  sayHello
}
