/**
 * Genera un sistema de 3 mapas ASCII (Laberinto, Enemigos y Monedas).
 * * @param {number} width - Ancho total (incluyendo muros).
 * @param {number} long - Largo total (incluyendo muros).
 * @param {number} difficulty - 1 a 10 (determina la complejidad de los caminos).
 * @param {number} nEnemies - Cantidad de enemigos "E".
 * @param {number} nCoins - Cantidad de monedas "C".
 * @returns {Object} { maze: string, enemies: string, coins: string }
 */
function generateMazeSystem(width, long, difficulty, nEnemies, nCoins) {
    // Asegurar dimensiones mínimas para tener espacio interior
    const w = width < 5 ? 5 : width;
    const l = long < 5 ? 5 : long;

    // 1. Inicializar matriz llena de muros (1 = muro, 0 = camino)
    let matrix = Array.from({ length: l }, () => Array(w).fill(1));

    // 2. Generación de caminos (Algoritmo de excavación aleatoria)
    function carve(x, y) {
        matrix[y][x] = 0;
        const dirs = [[0, 2], [0, -2], [2, 0], [-2, 0]].sort(() => Math.random() - 0.5);
        
        for (let [dx, dy] of dirs) {
            let nx = x + dx, ny = y + dy;
            if (nx > 0 && nx < w - 1 && ny > 0 && ny < l - 1 && matrix[ny][nx] === 1) {
                matrix[y + dy / 2][x + dx / 2] = 0;
                carve(nx, ny);
            }
        }
    }
    carve(1, 1); // Empezar en el interior

    // 3. Definir Inicio y Fin (dentro de la pared)
    const start = { x: 1, y: 1 };
    const end = { x: w % 2 === 0 ? w - 3 : w - 2, y: l % 2 === 0 ? l - 3 : l - 2 };
    matrix[start.y][start.x] = 0;
    matrix[end.y][end.x] = 0;

    // 4. Función para obtener el glifo ASCII según conexiones
    const getGlyph = (x, y) => {
        if (x === start.x && y === start.y) return '◌';
        if (x === end.x && y === end.y) return '●';
        if (matrix[y][x] === 1) return '█';

        const u = matrix[y - 1]?.[x] === 0;
        const d = matrix[y + 1]?.[x] === 0;
        const l_ = matrix[y][x - 1] === 0;
        const r = matrix[y][x + 1] === 0;

        // Lógica de conectores
        if (u && d && l_ && r) return '┼';
        if (u && d && l_) return '┤';
        if (u && d && r) return '├';
        if (l_ && r && u) return '┴';
        if (l_ && r && d) return '┬';
        if (u && d) return '│';
        if (l_ && r) return '─';
        if (d && r) return '┌';
        if (d && l_) return '┐';
        if (u && r) return '└';
        if (u && l_) return '┘';
        return '─';
    };

    // 5. Construcción de los 3 mapas
    let mazeStr = "", enemyStr = "", coinStr = "";
    let paths = [];

    for (let y = 0; y < l; y++) {
        for (let x = 0; x < w; x++) {
            const char = getGlyph(x, y);
            mazeStr += char;
            
            // Preparar capas de enemigos y monedas (fondo vacío)
            if (char !== '█' && char !== '◌' && char !== '●') {
                paths.push({x, y});
                enemyStr += " ";
                coinStr += " ";
            } else {
                enemyStr += char;
                coinStr += char;
            }
        }
        mazeStr += "\n"; enemyStr += "\n"; coinStr += "\n";
    }

    // 6. Posicionar Enemigos (Equidistantes en el array de caminos)
    let eCopy = enemyStr.split("");
    for (let i = 0; i < nEnemies; i++) {
        let idx = Math.floor((paths.length / (nEnemies + 1)) * (i + 1));
        let pos = paths[idx].y * (w + 1) + paths[idx].x;
        eCopy[pos] = "E";
    }

    // 7. Posicionar Monedas (Alejadas, simulando dificultad)
    let cCopy = coinStr.split("");
    let filteredPaths = paths.reverse(); // Empezar desde el final para "alejar"
    for (let i = 0; i < nCoins; i++) {
        if (filteredPaths[i]) {
            let pos = filteredPaths[i].y * (w + 1) + filteredPaths[i].x;
            cCopy[pos] = "C";
        }
    }

    return {
        maze: mazeStr,
        enemies: eCopy.join(""),
        coins: cCopy.join("")
    };
}

/*
const result = generateMazeSystem(21, 11, 5, 3, 5);

console.log("MAPA 1: ESTRUCTURA DEL LABERINTO");
console.log(result.maze);

console.log("\nMAPA 2: POSICIÓN DE ENEMIGOS (E)");
console.log(result.enemies);

console.log("\nMAPA 3: POSICIÓN DE MONEDAS (C)");
console.log(result.coins);
*/