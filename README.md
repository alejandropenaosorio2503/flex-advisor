# Flex Advisor — Mercado Libre Colombia

Plataforma de consultoría personalizada Flex para el equipo de Growth MCO.

## Qué hace

Ingresa el CUST_ID de un seller y en segundos genera un informe de consultoría completo con:
- Situación actual de su Flex (capacidad, zonas, horarios)
- Oportunidad real (penetración Flex vs mercado Colombia)
- Diagnóstico de qué lo está frenando (vs benchmark de su cluster)
- Plan de acción concreto con pasos priorizados por impacto

Todo con **datos reales de BigQuery en tiempo real** — cero números inventados.

## Arquitectura

```
Browser (Google Apps Script)
  └── google.script.run.fetchSellerData(custId)
        └── UrlFetchApp → Verdiflow webhook
              └── 7 queries BigQuery en paralelo
                    └── JSON {c, h, z, r, b, o, m}
```

## Archivos

| Archivo | Descripción |
|---------|-------------|
| `index.html` | Frontend completo (landing + consultoría) |
| `Code.gs` | Backend Google Apps Script — sirve HTML y llama a Verdiflow |

## Setup

1. Crear proyecto en [script.google.com](https://script.google.com)
2. Agregar `Code.gs` y `index.html`
3. Desplegar como **Web App** → ejecutar como tú → acceso para cualquiera
4. Compartir la URL generada

## Backend (Verdiflow)

- Workflow ID: `tEaIJotPi7o8NxKD`
- Webhook URL: `https://web.furycloud.io/api/proxy/verdi_flows/webhook/flex-advisor`
- Parámetro: `?cust_id=<CUST_ID>`

## Seller de prueba

CUST_ID: `247730346` (212GLOBALCOLOMBIA, Fontibón Bogotá)
