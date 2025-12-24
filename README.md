# 🧩 ASCII Maze Generator System

Un generador de laberintos en JavaScript que produce tres capas de mapas distintos (Estructura, Enemigos y Monedas) utilizando caracteres ASCII de dibujo de caja (box-drawing characters).

## 🚀 Características

- **Generación Procedural:** Utiliza el algoritmo de *Recursive Backtracking* para garantizar que siempre exista un camino entre el inicio y el fin.
- **Sistema de 3 Capas:**
    1.  **Mapa de Estructura:** Representación visual del laberinto con conexiones lógicas (`┌`, `─`, `┼`, etc.).
    2.  **Mapa de Enemigos:** Distribución estratégica y equidistante de enemigos (`E`) para no bloquear el paso.
    3.  **Mapa de Recompensas:** Colocación de monedas (`C`) en zonas de difícil acceso o alejadas de la ruta principal.
- **Personalización:** Control total sobre dimensiones, dificultad y cantidad de entidades.

## 🛠️ Parámetros de la Función

La función principal `generateMazeSystem(width, long, difficulty, nEnemies, nCoins)` acepta los siguientes argumentos:

| Parámetro | Tipo | Descripción |
| :--- | :--- | :--- |
| `width` | `number` | Ancho del laberinto (mínimo 5). |
| `long` | `number` | Largo del laberinto (mínimo 5). |
| `difficulty`| `number` | Escala del 1 al 10 que afecta la complejidad de los caminos. |
| `nEnemies` | `number` | Cantidad de enemigos representados por la letra `E`. |
| `nCoins` | `number` | Cantidad de monedas representadas por la letra `C`. |

## 📋 Reglas de Representación

- `◌`: Punto de inicio del laberinto.
- `●`: Meta o fin del laberinto.
- `█`: Muros perimetrales e internos.
- `│, ─, ┌, ┐, └, ┘, ├, ┤, ┬, ┴, ┼`: Representan pasillos, giros, bifurcaciones y cruces.

## 💻 Ejemplo de Uso

```javascript
// Generar un laberinto de 21x11 con 3 enemigos y 5 monedas
const sistema = generateMazeSystem(21, 11, 5, 3, 5);

console.log("--- ESTRUCTURA ---");
console.log(sistema.maze);

console.log("--- ENEMIGOS ---");
console.log(sistema.enemies);

console.log("--- MONEDAS ---");
console.log(sistema.coins);
