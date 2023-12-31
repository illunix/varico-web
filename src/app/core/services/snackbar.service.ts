import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({ providedIn: 'root' })
export class SnackBarService {
    public constructor(private _snackBar: MatSnackBar) { }

    public open(msg: string) {
        this._snackBar.open(msg, '', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 2500
          });
    }
}