const validateApp = (file)=>{
   const allowedExtension = ["apk","ipa","dmg"]
   const extensionsRegex = new RegExp(`\\.(${allowedExtension.join('|')})$`, 'i');

   if(!extensionsRegex.test(file)){
       return false
   }
   return true
}

export default validateApp