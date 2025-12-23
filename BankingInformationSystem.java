
import java.util.Scanner;

public class BankingInformationSystem {
    
    private static double balance = 0;
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        boolean quit = false;
        
        System.out.println("Welcome to the Banking Information System");
        
        while (!quit) {
            System.out.println("\nSelect an option:");
            System.out.println("1. Deposit");
            System.out.println("2. Withdraw");
            System.out.println("3. Check Balance");
            System.out.println("4. Exit");
            
            int choice = scanner.nextInt();
            
            switch (choice) {
                case 1:
                    System.out.print("Enter amount to deposit: ");
                    double depositAmount = scanner.nextDouble();
                    if (depositAmount > 0) {
                        balance += depositAmount;
                        System.out.println("Successfully deposited $" + depositAmount);
                    } else {
                        System.out.println("Invalid amount.");
                    }
                    break;
                case 2:
                    System.out.print("Enter amount to withdraw: ");
                    double withdrawAmount = scanner.nextDouble();
                    if (withdrawAmount > 0 && withdrawAmount <= balance) {
                        balance -= withdrawAmount;
                        System.out.println("Successfully withdrew $" + withdrawAmount);
                    } else {
                        System.out.println("Invalid amount or insufficient funds.");
                    }
                    break;
                case 3:
                    System.out.println("Current Balance: $" + balance);
                    break;
                case 4:
                    quit = true;
                    System.out.println("Thank you for using our Banking System.");
                    break;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
        
        scanner.close();
    }
}
