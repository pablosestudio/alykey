# Auditoría SEO de ALYKEY

**Revisión:** 7 de octubre de 2026
**Cobertura:** web estática publicada en GitHub Pages, cinco páginas comerciales, páginas de apoyo, cuatro landings localizadas, sitemap, robots, contenido, idiomas y conversión.

## Diagnóstico

La base técnica era razonable: HTML rastreable, una etiqueta H1 por página, títulos y descripciones, sitemap, `robots.txt`, precios visibles, datos de contacto y marcado `Organization`. La debilidad más importante era la arquitectura internacional: cuatro idiomas se elegían principalmente con JavaScript y almacenamiento del navegador. Google podía rastrear una única URL con un solo idioma inicial en vez de disponer de una página comercial estable por idioma.

No hay acceso a Google Search Console, Analytics ni datos de leads. Por tanto, esta auditoría no atribuye posiciones, clics, indexación real, Core Web Vitals ni conversiones, y no promete mejoras de ranking.

## Mejoras aplicadas

1. **URLs indexables para cuatro idiomas.** Se publicaron versiones estáticas de Inicio, Servicios y tarifas, Property Check, Sobre ALYKEY y Contacto en español (`/es/`), francés (`/fr/`) y ucraniano (`/uk/`), además del conjunto inglés existente.
2. **Señales internacionales coherentes.** Cada conjunto tiene canonical propio, alternates recíprocos `hreflang` para `en`, `es`, `fr`, `uk` y `x-default`, y selectores de idioma como enlaces rastreables. Los selectores resaltan el idioma activo.
3. **SEO local por idioma.** Títulos, descripciones, idioma del documento, Open Graph, etiquetas accesibles y copy comercial están localizados; las páginas clave ya no dependen del traductor ejecutado en el navegador para mostrar su texto.
4. **Datos técnicos y rastreo.** El sitemap ahora declara las 24 URLs indexables: las 20 páginas comerciales principales y las cuatro landings de segunda residencia. Legal y privacidad siguen fuera del índice con `noindex`.
5. **Datos estructurados.** La portada declara `Organization` y `WebSite`, con teléfono, correo y área de servicio. No se ha añadido una dirección física ni un `LocalBusiness` con una dirección inventada.
6. **Higiene del proyecto.** Se actualizaron las instrucciones de mantenimiento, idiomas, precios y despliegue para reflejar la web real.

Google recomienda páginas localizadas separadas y `hreflang` recíproco, además de canonicals consistentes y URLs absolutas en los sitemaps: [versiones localizadas](https://developers.google.com/search/docs/specialty/international/localized-versions), [canonicalización](https://developers.google.com/search/docs/crawling-indexing/canonicalization), [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap). Los títulos deben ser descriptivos y acordes con la página: [enlaces de título](https://developers.google.com/search/docs/appearance/title-link).

## Hallazgos y próximos pasos por prioridad

### P0 — dominio e indexación

- `alykey.es` no resolvió consultas DNS A, NS ni MX en el entorno de esta revisión y no fue accesible en la comprobación web; una búsqueda `site:alykey.es` tampoco devolvió páginas. Esto **no demuestra que el dominio esté disponible**. Confirmar registrador, nameservers y zona DNS.
- Cuando el dominio esté operativo, añadirlo como dominio personalizado en GitHub Pages, verificar HTTPS y probar todos los idiomas. Solo entonces cambiar canónicos, `og:url`, `robots.txt`, schema y sitemap a `https://alykey.es/`, añadir la configuración de Pages y comprobar redirecciones para concentrar señales en un único host.
- Dar de alta y verificar la propiedad en Google Search Console. Enviar el sitemap después del cambio de dominio y revisar indexación, sitemap, consultas, páginas con clics y problemas de experiencia. La web no incluye aún una propiedad Search Console verificable.

### P0 — confianza y requisitos operativos

- `legal.html` y `privacy.html` siguen siendo borradores visibles con marcadores como `[REGISTERED ADDRESS]`, `[DATE]` y notas de plantilla. Están en `noindex`, pero un visitante puede abrirlos desde el pie. Antes de promocionar la web, sustituir esos marcadores por información real y revisar los avisos con un profesional: identidad del responsable, contacto, base y finalidad del tratamiento, conservación, derechos, encargados, transferencias, cookies/almacenamiento local y términos del servicio. No publicar un CIF ni un domicilio que el propietario no haya facilitado.
- El formulario no envía los datos a un servidor: abre un borrador en el correo del usuario, que debe pulsar «Enviar». Mantener ese aviso claro o conectar un proveedor de formularios y adaptar la privacidad antes de medir envíos.

### P1 — visibilidad local y contenido

- La búsqueda competitiva muestra operadores de custodia de llaves y cuidado de viviendas que explican servicio, zona, fotos, coordinación y tarifas; por ejemplo, [KeyNido](https://keynido.com/). ALYKEY debe competir con su propuesta concreta —custodia documentada, informes fotográficos en 24 h, alcance visual explícito y tarifas transparentes—, no con textos genéricos ni afirmaciones no demostrables.
- **Contraste de precios publicado el 6-10-2026:** KeyNido anuncia Custodia 19 €/mes, Esencial 59 €/mes (1 visita), Tranquilidad 99 €/mes (2) y Continuidad 139 €/mes (3), con IVA incluido. ALYKEY publica 19 €, 49 €, 89 € y 159 € respectivamente, con 1, 2 y 4 visitas en los últimos tres planes. ALYKEY queda 10 € por debajo en los dos planes de menor frecuencia; Weekly cuesta 20 € más al mes que Continuidad, pero incluye una cuarta visita (39,75 €/visita frente a 46,33 € a precio de lista, antes de comparar condiciones e IVA). La página debería vender esa diferencia explicando mejor frecuencia, duración, informe, alcance, desplazamientos, cancelación e impuestos. La comparación no sustituye presupuestos equivalentes: [tarifas de KeyNido](https://keynido.com/).
- Otro competidor de la zona, Costakey-Holding, anuncia una revisión mensual por 45 €/mes con custodia e informe, y detalla puntos de control; sirve como referencia de que el usuario espera alcance concreto, fotos y condiciones incluidas: [Costakey-Holding](https://www.costakey-holding.com/).
- Crear páginas de zona solo donde ALYKEY preste realmente el servicio y pueda aportar contenido único: cobertura, tiempos, tipo de vivienda, acceso y casos reales anonimizados. Evitar páginas casi idénticas por municipio.
- Para Google Business Profile, verificar elegibilidad como empresa de área de servicio. Si se cumplen sus reglas, ocultar la dirección residencial y configurar solo zonas atendidas; no crear un perfil como si existiera un local abierto al público. [Reglas de área de servicio](https://support.google.com/business/answer/3038177?hl=es).
- Incorporar fotografías propias autorizadas de visitas y procesos reales, explicar quién presta las visitas y cómo se custodian las llaves, y pedir reseñas auténticas a clientes. No usar reseñas, estrellas, experiencia, seguros ni certificaciones inventadas.

### P1 — medir antes de seguir optimizando

- Registrar en Search Console impresiones, clics, CTR y consultas por idioma/página. Separar «cuidado de segunda residencia», «custodia de llaves», «home watch/property care» e «inspección de vivienda» como intenciones distintas.
- Vigilar errores 404, canonical elegida por Google, indexación de las páginas localizadas, sitemap y Core Web Vitals en datos reales. No hay mediciones de laboratorio o campo incluidas en esta auditoría.
- Decidir si se instala analítica o seguimiento de llamadas/WhatsApp; si se hace, configurar consentimiento y actualizar privacidad conforme a la tecnología elegida. Evitar instrumentar sin consentimiento cuando sea necesario.

## Límites que conviene preservar

- No añadir dirección física estructurada: ALYKEY no tiene un local para atender al público.
- No añadir marcado `LocalBusiness` que exija una dirección ni ratings/reviews ficticias. Google documenta los datos de organización y negocio local por separado: [Organization](https://developers.google.com/search/docs/appearance/structured-data/organization), [LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business).
- Las visitas se describen como comprobaciones visuales, no inspecciones técnicas ni garantía de detección de fallos ocultos.
- SEO es acumulativo: publicación e indexación no implican posiciones concretas ni un plazo garantizado.

## Segunda revisión y mejoras aplicadas (7 de octubre de 2026)

- **Precio de entrada coherente.** Las cuatro páginas de cuidado de segunda residencia indicaban planes desde 49 €/mes, aunque Custodia Base cuesta 19 €/mes o 190 €/año. Ahora se comunica por separado la custodia sin visitas y los planes que sí incluyen visitas. También se explica que Custodia Base no incluye inspecciones ni informes de visita.
- **Enlazado interno por idioma.** Las portadas ES/FR/UK enlazaban a la landing inglesa de segunda residencia. Ahora cada una apunta a su contenido localizado. Las páginas de tarifas también enlazan a la landing correspondiente, con texto ancla descriptivo. Es importante que los enlaces se puedan rastrear como enlaces HTML normales: [guía oficial de enlaces rastreables](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).
- **Correcciones editoriales.** Se corrigió una repetición en la duración de visita de la página española y se aclaró que los 30–45 minutos aplican a cada visita programada, no al mes.
- **Competencia y posicionamiento.** La página de KeyNido consultada publica 19 €/mes por custodia, 59 € por una visita y 99 € por dos; Costakey-Holding comunica un servicio mensual desde 45 € con custodia e informe. ALYKEY queda por debajo en Essential y Plus, pero Weekly (159 €/mes) no es el plan mensual más barato; debe defender su valor explicando que incluye cuatro visitas mensuales (no 52 al año). Referencias: [KeyNido](https://keynido.com/) y [Costakey-Holding](https://www.costakey-holding.com/). Los precios de terceros pueden cambiar; comprobarlos periódicamente.
- **Contenido útil frente a páginas creadas solo para buscadores.** Mantener información específica, alcance exacto y experiencia real verificable en cada idioma. Google prioriza contenido útil para personas; ampliar con protocolo real de visita, ejemplos autorizados de informes y fotos originales, no con texto repetido ni promesas no demostrables: [contenido útil y centrado en las personas](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).
- **Medición pendiente.** No hay acceso a Search Console/Analytics ni datos reales de impresiones, posiciones, indexación elegida por Google, leads o Core Web Vitals. El intento de PageSpeed Insights no produjo medición porque la API respondió límite de cuota (429); no se atribuye ninguna puntuación ni mejora de rendimiento sin una prueba válida.

### Próximas acciones con mayor impacto

1. Configurar el dominio definitivo `alykey.es` y Search Console; verificar propiedad, sitemap, canonicals e indexación por idioma. El dominio actual de GitHub Pages debe seguir siendo canónico hasta que el dominio propio resuelva y sirva HTTPS correctamente.
2. Completar las páginas legales con la identidad y domicilio legal que correspondan antes de captar clientes; no inventar CIF, dirección, certificaciones ni reseñas.
3. Recopilar pruebas reales de confianza: fotos propias de visitas, protocolo de custodia, ejemplo anonimizado del informe y reseñas auténticas con permiso.
4. Medir rendimiento móvil con PageSpeed Insights o Lighthouse y Core Web Vitals en Search Console/CrUX cuando haya datos suficientes; priorizar LCP, INP y CLS con mediciones, no suposiciones.
5. Revisar conversiones: el formulario prepara un correo en el dispositivo del usuario y no envía una solicitud automáticamente; medir si ese paso reduce contactos y evaluar una alternativa con privacidad y consentimiento adecuados.
