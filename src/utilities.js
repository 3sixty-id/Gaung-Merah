export default function GenerateRandomCode(arrayCodes, lenght) {
   const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
   let code;

   do {
      code = "";
      for (let i = 0; i < lenght; i++) {
         const randomIndex = Math.floor(Math.random() * characters.length);
         code += characters[randomIndex];
      }
   } while (arrayCodes.hasOwnProperty(code));

   return code;
}
