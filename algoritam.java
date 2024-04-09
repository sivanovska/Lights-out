import java.util.Scanner;

public class algoritam {
    private static int[][] grid;
    private static int n, m;
    private static int[][] click;

    private static void toggle(int row, int col) {
        grid[row][col] = 1 - grid[row][col];

        if (row > 0)
            grid[row - 1][col] = 1 - grid[row - 1][col];
        if (row < n - 1)
            grid[row + 1][col] = 1 - grid[row + 1][col];
        if (col > 0)
            grid[row][col - 1] = 1 - grid[row][col - 1];
        if (col < m - 1)
            grid[row][col + 1] = 1 - grid[row][col + 1];
    }

    private static boolean allLightsOn() {
        for (int i = 0; i < m; i++) {
            if (grid[m - 1][i] != 1)
                return false;
        }
        return true;
    }

    private static boolean solveLightsOut(int row, int col) {
        if (row == n) {
            if (allLightsOn()) {

                for (int i = 0; i < n; i++) {
                    for (int j = 0; j < n; j++) {
                        System.out.print(grid[i][j] + " ");
                    }
                    System.out.println();

                }
                return true;
            } else
                return false;
        }
        int nextRow = (col == m - 1) ? row + 1 : row;
        int nextCol = (col == m - 1) ? 0 : col + 1;

        if (row == 0) {
            toggle(row, col);
            click[row][col] = 1;
            if (solveLightsOut(nextRow, nextCol))
                return true;

            toggle(row, col);
            click[row][col] = 0;
            return solveLightsOut(nextRow, nextCol);

        } else if (row > 0 && grid[row - 1][col] == 0) {
            toggle(row, col);
            click[row][col] = 1;
            if (solveLightsOut(nextRow, nextCol))
                return true;
            toggle(row, col);
            click[row][col] = 0;
            return false;
            // click[row][col] = 1;
            // System.out.println("bla");
        }
        return solveLightsOut(nextRow, nextCol);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        n = sc.nextInt();
        m = sc.nextInt();

        grid = new int[n][m];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++)
                grid[i][j] = sc.nextInt();
        }
        click = new int[n][m];

        if (solveLightsOut(0, 0)) {
            System.out.println("Matrix is solvable.");
        } else {
            System.out.println("Matrix is not solvable.");
        }

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print(click[i][j] + " ");
            }
            System.out.println();
        }
    }
}
