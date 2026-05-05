# SPRINT 3 BACKLOG

## Sprint Goal
Improve system security and validations.

## User Stories
- US-02: User Login
- US-03: Password Encryption
- US-06: Error Handling

## Tasks
- [x] Implement bcrypt
- [x] Encrypt passwords
- [x] Validate duplicate users
- [x] Improve backend error messages
- [x] Connect frontend error display

## Result
- Secure authentication system
- Better user feedback

## Related Versions
- [SEC]-v0.9.0

---

### AI Usage (Prompts and support)

**Prompt:**
> ¿Es seguro guardar contraseñas en texto plano?

**IA support:**
> La IA explicó riesgos de seguridad y recomendó usar bcrypt, tambien ayudandonos a crear un archivo para encriptar las contraseñas que
> ya habian sido creadas para probar la aplicación y tambien ayudandonos a crear el metodo para encriptarlas.

---

**Prompt:**
> ¿Cómo validar contraseñas encriptadas?

**Apoyo de la IA:**
> Se explicó que la validación debe hacerse en backend, no en SQL.