import { HttpInterceptorFn } from '@angular/common/http';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('x-access-token');

  //console.log(token)
  let requestToSend = req;

  if(token){
    // Ajout de l'en-tête "Authorization" avec le jeton au format "Token <jeton>".
    const headers = req.headers.set("Authorization", `x-access-token ${token}`);

    // Clonage de la requête d'origine avec les nouveaux en-têtes modifiés.
    requestToSend = req.clone({
      headers: headers
    });
  }

   // Passage de la requête (modifiée ou non) à la prochaine étape de la chaîne des intercepteurs.
   return next(requestToSend);
}
