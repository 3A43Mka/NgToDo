import {Component, OnInit} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from '../../model/todo';
import { TodoSyncStorageService } from '../../service/todo-sync-storage.service';
import { TodoCreateAction, TodoDeleteAction, TodoEditAction, TodoToggleAction } from '../../store/todo.actions';
import {TodoState} from '../../store/todo.reducer';
import { todoListSelector } from '../../store/todo.selectors';

@Component({
    selector: 'app-todo-widget',
    templateUrl: './todo-widget.component.html',
    styleUrls: ['./todo-widget.component.scss']
})
export class TodoWidgetComponent implements OnInit {

    todoList$: Observable<Todo[]> = this.store$.pipe(select(todoListSelector));

    constructor(
        private store$: Store<TodoState>,
        private todoSyncStorage: TodoSyncStorageService
        ) {}

    ngOnInit() {
        this.todoSyncStorage.init();
    }

    onCreate(name: string) {
        this.store$.dispatch(new TodoCreateAction({ name }));
    }

    onDelete(id: number) {
        this.store$.dispatch(new TodoDeleteAction({ id }));
    }

    onToggle(id: number) {
        this.store$.dispatch(new TodoToggleAction({ id }));
    }

    onEdit({id, name}){
        this.store$.dispatch(new TodoEditAction({ id, name }));
    }
}