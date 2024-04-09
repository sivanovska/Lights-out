import java.util.Scanner;

public class bla {
    private static int[][] grid;
    private static int n, m;
    private static int[][] click;

    // Function to toggle the state of a cell and its neighbors
    private static void toggle(int row, int col) {
        grid[row][col] = 1 - grid[row][col]; // Toggle the current cell

        // Toggle the neighboring cells
        if (row > 0)
            grid[row - 1][col] = 1 - grid[row - 1][col]; // Toggle cell above
        if (row < n - 1)
            grid[row + 1][col] = 1 - grid[row + 1][col]; // Toggle cell below
        if (col > 0)
            grid[row][col - 1] = 1 - grid[row][col - 1]; // Toggle cell to the left
        if (col < m - 1)
            grid[row][col + 1] = 1 - grid[row][col + 1]; // Toggle cell to the right
    }

    // Function to check if all lights are turned on
    private static boolean allLightsOn() {
        for (int i = 0; i < m; i++) {
            if (grid[m - 1][i] != 1)
                return false;
        }
        return true;
    }

    // Backtracking function to solve the Lights Out problem
    private static boolean solveLightsOut(int row, int col) {
        // System.out.println(row + " " + col);
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

    // Main function to solve the Lights Out problem
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

        // Solve the Lights Out problem starting from the top-left corner
        if (solveLightsOut(0, 0)) {
            System.out.println("Matrix is solvable.");
        } else {
            System.out.println("Matrix is not solvable.");
        }

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print(click[i][j] + " ");
            }
            System.out.println(); // Move to the next line after printing each row
        }
    }
}
