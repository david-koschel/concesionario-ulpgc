import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, ViewChild, ViewEncapsulation, computed, forwardRef, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { AngleDownIcon } from 'primeng/icons/angledown';
import { AngleRightIcon } from 'primeng/icons/angleright';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { TooltipModule } from 'primeng/tooltip';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
import * as i3 from "primeng/tooltip";
export class PanelMenuSub {
    panelMenu;
    el;
    panelId;
    focusedItemId;
    items;
    itemTemplate;
    level = 0;
    activeItemPath;
    root;
    tabindex;
    transitionOptions;
    parentExpanded;
    itemToggle = new EventEmitter();
    menuFocus = new EventEmitter();
    menuBlur = new EventEmitter();
    menuKeyDown = new EventEmitter();
    listViewChild;
    constructor(panelMenu, el) {
        this.panelMenu = panelMenu;
        this.el = el;
    }
    getItemId(processedItem) {
        return processedItem.item?.id ?? `${this.panelId}_${processedItem.key}`;
    }
    getItemKey(processedItem) {
        return this.getItemId(processedItem);
    }
    getItemClass(processedItem) {
        return {
            'p-menuitem': true,
            'p-disabled': this.isItemDisabled(processedItem)
        };
    }
    getItemProp(processedItem, name, params) {
        return processedItem && processedItem.item ? ObjectUtils.getItemValue(processedItem.item[name], params) : undefined;
    }
    getItemLabel(processedItem) {
        return this.getItemProp(processedItem, 'label');
    }
    isItemExpanded(processedItem) {
        return processedItem.expanded;
    }
    isItemActive(processedItem) {
        return this.isItemExpanded(processedItem) || this.activeItemPath.some((path) => path && path.key === processedItem.key);
    }
    isItemVisible(processedItem) {
        return this.getItemProp(processedItem, 'visible') !== false;
    }
    isItemDisabled(processedItem) {
        return this.getItemProp(processedItem, 'disabled');
    }
    isItemFocused(processedItem) {
        return this.focusedItemId === this.getItemId(processedItem);
    }
    isItemGroup(processedItem) {
        return ObjectUtils.isNotEmpty(processedItem.items);
    }
    getAnimation(processedItem) {
        return this.isItemActive(processedItem) ? { value: 'visible', params: { transitionParams: this.transitionOptions, height: '*' } } : { value: 'hidden', params: { transitionParams: this.transitionOptions, height: '0' } };
    }
    getAriaSetSize() {
        return this.items.filter((processedItem) => this.isItemVisible(processedItem) && !this.getItemProp(processedItem, 'separator')).length;
    }
    getAriaPosInset(index) {
        return index - this.items.slice(0, index).filter((processedItem) => this.isItemVisible(processedItem) && this.getItemProp(processedItem, 'separator')).length + 1;
    }
    onItemClick(event, processedItem) {
        if (!this.isItemDisabled(processedItem)) {
            this.getItemProp(processedItem, 'command', { originalEvent: event, item: processedItem.item });
            this.itemToggle.emit({ processedItem, expanded: !this.isItemActive(processedItem) });
        }
    }
    onItemToggle(event) {
        this.itemToggle.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: PanelMenuSub, deps: [{ token: forwardRef(() => PanelMenu) }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.2", type: PanelMenuSub, selector: "p-panelMenuSub", inputs: { panelId: "panelId", focusedItemId: "focusedItemId", items: "items", itemTemplate: "itemTemplate", level: "level", activeItemPath: "activeItemPath", root: "root", tabindex: "tabindex", transitionOptions: "transitionOptions", parentExpanded: "parentExpanded" }, outputs: { itemToggle: "itemToggle", menuFocus: "menuFocus", menuBlur: "menuBlur", menuKeyDown: "menuKeyDown" }, host: { classAttribute: "p-element" }, viewQueries: [{ propertyName: "listViewChild", first: true, predicate: ["list"], descendants: true }], ngImport: i0, template: `
        <ul
            #list
            [ngClass]="{ 'p-submenu-list': true, 'p-panelmenu-root-list': root }"
            role="tree"
            [tabindex]="-1"
            [attr.aria-activedescendant]="focusedItemId"
            [attr.data-pc-section]="'menu'"
            [attr.aria-hidden]="!parentExpanded"
            (focusin)="menuFocus.emit($event)"
            (focusout)="menuBlur.emit($event)"
            (keydown)="menuKeyDown.emit($event)"
        >
            <ng-template ngFor let-processedItem let-index="index" [ngForOf]="items">
                <li *ngIf="processedItem.separator" class="p-menuitem-separator" role="separator"></li>
                <li
                    *ngIf="!processedItem.separator && isItemVisible(processedItem)"
                    [ngClass]="getItemClass(processedItem)"
                    role="treeitem"
                    [attr.id]="getItemId(processedItem)"
                    [attr.aria-label]="getItemProp(processedItem, 'label')"
                    [attr.aria-expanded]="isItemGroup(processedItem) ? isItemActive(processedItem) : undefined"
                    [attr.aria-level]="level + 1"
                    [attr.aria-setsize]="getAriaSetSize()"
                    [attr.aria-posinset]="getAriaPosInset(index)"
                    [class]="getItemProp(processedItem, 'styleClass')"
                    [class.p-hidden]="processedItem.visible === false"
                    [class.p-focus]="isItemFocused(processedItem) && !isItemDisabled(processedItem)"
                    [ngStyle]="getItemProp(processedItem, 'style')"
                    [pTooltip]="getItemProp(processedItem, 'tooltip')"
                    [attr.data-p-disabled]="isItemDisabled(processedItem)"
                    [tooltipOptions]="getItemProp(processedItem, 'tooltipOptions')"
                >
                    <div class="p-menuitem-content" (click)="onItemClick($event, processedItem)">
                        <ng-container *ngIf="!itemTemplate">
                            <a
                                *ngIf="!getItemProp(processedItem, 'routerLink')"
                                [attr.href]="getItemProp(processedItem, 'url')"
                                class="p-menuitem-link"
                                [ngClass]="{ 'p-disabled': getItemProp(processedItem, 'disabled') }"
                                [target]="getItemProp(processedItem, 'target')"
                                [attr.data-pc-section]="'action'"
                                [attr.tabindex]="!!parentExpanded ? '0' : '-1'"
                            >
                                <ng-container *ngIf="isItemGroup(processedItem)">
                                    <ng-container *ngIf="!panelMenu.submenuIconTemplate">
                                        <AngleDownIcon [styleClass]="'p-submenu-icon'" *ngIf="isItemActive(processedItem)" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                        <AngleRightIcon [styleClass]="'p-submenu-icon'" *ngIf="!isItemActive(processedItem)" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="panelMenu.submenuIconTemplate"></ng-template>
                                </ng-container>
                                <span class="p-menuitem-icon" [ngClass]="processedItem.icon" *ngIf="processedItem.icon" [ngStyle]="getItemProp(processedItem, 'iconStyle')"></span>
                                <span class="p-menuitem-text" *ngIf="processedItem.item?.escape !== false; else htmlLabel">{{ getItemProp(processedItem, 'label') }}</span>
                                <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(processedItem, 'label')"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="processedItem.badge" [ngClass]="processedItem.badgeStyleClass">{{ processedItem.badge }}</span>
                            </a>
                            <a
                                *ngIf="getItemProp(processedItem, 'routerLink')"
                                [routerLink]="getItemProp(processedItem, 'routerLink')"
                                [queryParams]="getItemProp(processedItem, 'queryParams')"
                                [routerLinkActive]="'p-menuitem-link-active'"
                                [routerLinkActiveOptions]="getItemProp(processedItem, 'routerLinkActiveOptions') || { exact: false }"
                                class="p-menuitem-link"
                                [ngClass]="{ 'p-disabled': getItemProp(processedItem, 'disabled') }"
                                [target]="getItemProp(processedItem, 'target')"
                                [attr.title]="getItemProp(processedItem, 'title')"
                                [fragment]="getItemProp(processedItem, 'fragment')"
                                [queryParamsHandling]="getItemProp(processedItem, 'queryParamsHandling')"
                                [preserveFragment]="getItemProp(processedItem, 'preserveFragment')"
                                [skipLocationChange]="getItemProp(processedItem, 'skipLocationChange')"
                                [replaceUrl]="getItemProp(processedItem, 'replaceUrl')"
                                [state]="getItemProp(processedItem, 'state')"
                                [attr.data-pc-section]="'action'"
                                [attr.tabindex]="!!parentExpanded ? '0' : '-1'"
                            >
                                <ng-container *ngIf="isItemGroup(processedItem)">
                                    <ng-container *ngIf="!panelMenu.submenuIconTemplate">
                                        <AngleDownIcon *ngIf="isItemActive(processedItem)" [styleClass]="'p-submenu-icon'" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                        <AngleRightIcon *ngIf="!isItemActive(processedItem)" [styleClass]="'p-submenu-icon'" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="panelMenu.submenuIconTemplate"></ng-template>
                                </ng-container>
                                <span class="p-menuitem-icon" [ngClass]="processedItem.icon" *ngIf="processedItem.icon" [ngStyle]="getItemProp(processedItem, 'iconStyle')"></span>
                                <span class="p-menuitem-text" *ngIf="getItemProp(processedItem, 'escape') !== false; else htmlRouteLabel">{{ getItemProp(processedItem, 'label') }}</span>
                                <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(processedItem, 'label')"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="processedItem.badge" [ngClass]="getItemProp(processedItem, 'badgeStyleClass')">{{ getItemProp(processedItem, 'badge') }}</span>
                            </a>
                        </ng-container>
                        <ng-container *ngIf="itemTemplate">
                            <ng-template *ngTemplateOutlet="itemTemplate; context: { $implicit: processedItem.item }"></ng-template>
                        </ng-container>
                    </div>
                    <div class="p-toggleable-content" [@submenu]="getAnimation(processedItem)">
                        <p-panelMenuSub
                            *ngIf="isItemVisible(processedItem) && isItemGroup(processedItem)"
                            [id]="getItemId(processedItem) + '_list'"
                            [panelId]="panelId"
                            [items]="processedItem.items"
                            [itemTemplate]="itemTemplate"
                            [transitionOptions]="transitionOptions"
                            [focusedItemId]="focusedItemId"
                            [activeItemPath]="activeItemPath"
                            [level]="level + 1"
                            [parentExpanded]="!!parentExpanded && isItemExpanded(processedItem)"
                            (itemToggle)="onItemToggle($event)"
                        ></p-panelMenuSub>
                    </div>
                </li>
            </ng-template>
        </ul>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i2.RouterLink), selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i0.forwardRef(() => i2.RouterLinkActive), selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "directive", type: i0.forwardRef(() => i3.Tooltip), selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "autoHide", "fitContent", "hideOnEscape", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { kind: "component", type: i0.forwardRef(() => AngleDownIcon), selector: "AngleDownIcon" }, { kind: "component", type: i0.forwardRef(() => AngleRightIcon), selector: "AngleRightIcon" }, { kind: "component", type: i0.forwardRef(() => PanelMenuSub), selector: "p-panelMenuSub", inputs: ["panelId", "focusedItemId", "items", "itemTemplate", "level", "activeItemPath", "root", "tabindex", "transitionOptions", "parentExpanded"], outputs: ["itemToggle", "menuFocus", "menuBlur", "menuKeyDown"] }], animations: [
            trigger('submenu', [
                state('hidden', style({
                    height: '0'
                })),
                state('visible', style({
                    height: '*'
                })),
                transition('visible <=> hidden', [animate('{{transitionParams}}')]),
                transition('void => *', animate(0))
            ])
        ], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: PanelMenuSub, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-panelMenuSub',
                    template: `
        <ul
            #list
            [ngClass]="{ 'p-submenu-list': true, 'p-panelmenu-root-list': root }"
            role="tree"
            [tabindex]="-1"
            [attr.aria-activedescendant]="focusedItemId"
            [attr.data-pc-section]="'menu'"
            [attr.aria-hidden]="!parentExpanded"
            (focusin)="menuFocus.emit($event)"
            (focusout)="menuBlur.emit($event)"
            (keydown)="menuKeyDown.emit($event)"
        >
            <ng-template ngFor let-processedItem let-index="index" [ngForOf]="items">
                <li *ngIf="processedItem.separator" class="p-menuitem-separator" role="separator"></li>
                <li
                    *ngIf="!processedItem.separator && isItemVisible(processedItem)"
                    [ngClass]="getItemClass(processedItem)"
                    role="treeitem"
                    [attr.id]="getItemId(processedItem)"
                    [attr.aria-label]="getItemProp(processedItem, 'label')"
                    [attr.aria-expanded]="isItemGroup(processedItem) ? isItemActive(processedItem) : undefined"
                    [attr.aria-level]="level + 1"
                    [attr.aria-setsize]="getAriaSetSize()"
                    [attr.aria-posinset]="getAriaPosInset(index)"
                    [class]="getItemProp(processedItem, 'styleClass')"
                    [class.p-hidden]="processedItem.visible === false"
                    [class.p-focus]="isItemFocused(processedItem) && !isItemDisabled(processedItem)"
                    [ngStyle]="getItemProp(processedItem, 'style')"
                    [pTooltip]="getItemProp(processedItem, 'tooltip')"
                    [attr.data-p-disabled]="isItemDisabled(processedItem)"
                    [tooltipOptions]="getItemProp(processedItem, 'tooltipOptions')"
                >
                    <div class="p-menuitem-content" (click)="onItemClick($event, processedItem)">
                        <ng-container *ngIf="!itemTemplate">
                            <a
                                *ngIf="!getItemProp(processedItem, 'routerLink')"
                                [attr.href]="getItemProp(processedItem, 'url')"
                                class="p-menuitem-link"
                                [ngClass]="{ 'p-disabled': getItemProp(processedItem, 'disabled') }"
                                [target]="getItemProp(processedItem, 'target')"
                                [attr.data-pc-section]="'action'"
                                [attr.tabindex]="!!parentExpanded ? '0' : '-1'"
                            >
                                <ng-container *ngIf="isItemGroup(processedItem)">
                                    <ng-container *ngIf="!panelMenu.submenuIconTemplate">
                                        <AngleDownIcon [styleClass]="'p-submenu-icon'" *ngIf="isItemActive(processedItem)" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                        <AngleRightIcon [styleClass]="'p-submenu-icon'" *ngIf="!isItemActive(processedItem)" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="panelMenu.submenuIconTemplate"></ng-template>
                                </ng-container>
                                <span class="p-menuitem-icon" [ngClass]="processedItem.icon" *ngIf="processedItem.icon" [ngStyle]="getItemProp(processedItem, 'iconStyle')"></span>
                                <span class="p-menuitem-text" *ngIf="processedItem.item?.escape !== false; else htmlLabel">{{ getItemProp(processedItem, 'label') }}</span>
                                <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(processedItem, 'label')"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="processedItem.badge" [ngClass]="processedItem.badgeStyleClass">{{ processedItem.badge }}</span>
                            </a>
                            <a
                                *ngIf="getItemProp(processedItem, 'routerLink')"
                                [routerLink]="getItemProp(processedItem, 'routerLink')"
                                [queryParams]="getItemProp(processedItem, 'queryParams')"
                                [routerLinkActive]="'p-menuitem-link-active'"
                                [routerLinkActiveOptions]="getItemProp(processedItem, 'routerLinkActiveOptions') || { exact: false }"
                                class="p-menuitem-link"
                                [ngClass]="{ 'p-disabled': getItemProp(processedItem, 'disabled') }"
                                [target]="getItemProp(processedItem, 'target')"
                                [attr.title]="getItemProp(processedItem, 'title')"
                                [fragment]="getItemProp(processedItem, 'fragment')"
                                [queryParamsHandling]="getItemProp(processedItem, 'queryParamsHandling')"
                                [preserveFragment]="getItemProp(processedItem, 'preserveFragment')"
                                [skipLocationChange]="getItemProp(processedItem, 'skipLocationChange')"
                                [replaceUrl]="getItemProp(processedItem, 'replaceUrl')"
                                [state]="getItemProp(processedItem, 'state')"
                                [attr.data-pc-section]="'action'"
                                [attr.tabindex]="!!parentExpanded ? '0' : '-1'"
                            >
                                <ng-container *ngIf="isItemGroup(processedItem)">
                                    <ng-container *ngIf="!panelMenu.submenuIconTemplate">
                                        <AngleDownIcon *ngIf="isItemActive(processedItem)" [styleClass]="'p-submenu-icon'" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                        <AngleRightIcon *ngIf="!isItemActive(processedItem)" [styleClass]="'p-submenu-icon'" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="panelMenu.submenuIconTemplate"></ng-template>
                                </ng-container>
                                <span class="p-menuitem-icon" [ngClass]="processedItem.icon" *ngIf="processedItem.icon" [ngStyle]="getItemProp(processedItem, 'iconStyle')"></span>
                                <span class="p-menuitem-text" *ngIf="getItemProp(processedItem, 'escape') !== false; else htmlRouteLabel">{{ getItemProp(processedItem, 'label') }}</span>
                                <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(processedItem, 'label')"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="processedItem.badge" [ngClass]="getItemProp(processedItem, 'badgeStyleClass')">{{ getItemProp(processedItem, 'badge') }}</span>
                            </a>
                        </ng-container>
                        <ng-container *ngIf="itemTemplate">
                            <ng-template *ngTemplateOutlet="itemTemplate; context: { $implicit: processedItem.item }"></ng-template>
                        </ng-container>
                    </div>
                    <div class="p-toggleable-content" [@submenu]="getAnimation(processedItem)">
                        <p-panelMenuSub
                            *ngIf="isItemVisible(processedItem) && isItemGroup(processedItem)"
                            [id]="getItemId(processedItem) + '_list'"
                            [panelId]="panelId"
                            [items]="processedItem.items"
                            [itemTemplate]="itemTemplate"
                            [transitionOptions]="transitionOptions"
                            [focusedItemId]="focusedItemId"
                            [activeItemPath]="activeItemPath"
                            [level]="level + 1"
                            [parentExpanded]="!!parentExpanded && isItemExpanded(processedItem)"
                            (itemToggle)="onItemToggle($event)"
                        ></p-panelMenuSub>
                    </div>
                </li>
            </ng-template>
        </ul>
    `,
                    animations: [
                        trigger('submenu', [
                            state('hidden', style({
                                height: '0'
                            })),
                            state('visible', style({
                                height: '*'
                            })),
                            transition('visible <=> hidden', [animate('{{transitionParams}}')]),
                            transition('void => *', animate(0))
                        ])
                    ],
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: PanelMenu, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => PanelMenu)]
                }] }, { type: i0.ElementRef }], propDecorators: { panelId: [{
                type: Input
            }], focusedItemId: [{
                type: Input
            }], items: [{
                type: Input
            }], itemTemplate: [{
                type: Input
            }], level: [{
                type: Input
            }], activeItemPath: [{
                type: Input
            }], root: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], transitionOptions: [{
                type: Input
            }], parentExpanded: [{
                type: Input
            }], itemToggle: [{
                type: Output
            }], menuFocus: [{
                type: Output
            }], menuBlur: [{
                type: Output
            }], menuKeyDown: [{
                type: Output
            }], listViewChild: [{
                type: ViewChild,
                args: ['list']
            }] } });
export class PanelMenuList {
    el;
    panelId;
    id;
    items;
    itemTemplate;
    parentExpanded;
    expanded;
    transitionOptions;
    root;
    tabindex;
    activeItem;
    itemToggle = new EventEmitter();
    headerFocus = new EventEmitter();
    subMenuViewChild;
    searchTimeout;
    searchValue;
    focused;
    focusedItem = signal(null);
    activeItemPath = signal([]);
    processedItems = signal([]);
    visibleItems = computed(() => {
        const processedItems = this.processedItems();
        return this.flatItems(processedItems);
    });
    get focusedItemId() {
        const focusedItem = this.focusedItem();
        return focusedItem && focusedItem.item?.id ? focusedItem.item.id : ObjectUtils.isNotEmpty(this.focusedItem()) ? `${this.panelId}_${this.focusedItem().key}` : undefined;
    }
    constructor(el) {
        this.el = el;
    }
    ngOnChanges(changes) {
        if (changes && changes.items && changes.items.currentValue) {
            this.processedItems.set(this.createProcessedItems(changes.items.currentValue || []));
        }
    }
    getItemProp(processedItem, name) {
        return processedItem && processedItem.item ? ObjectUtils.getItemValue(processedItem.item[name]) : undefined;
    }
    getItemLabel(processedItem) {
        return this.getItemProp(processedItem, 'label');
    }
    isItemVisible(processedItem) {
        return this.getItemProp(processedItem, 'visible') !== false;
    }
    isItemDisabled(processedItem) {
        return this.getItemProp(processedItem, 'disabled');
    }
    isItemActive(processedItem) {
        return this.activeItemPath().some((path) => path.key === processedItem.parentKey);
    }
    isItemGroup(processedItem) {
        return ObjectUtils.isNotEmpty(processedItem.items);
    }
    isElementInPanel(event, element) {
        const panel = event.currentTarget.closest('[data-pc-section="panel"]');
        return panel && panel.contains(element);
    }
    isItemMatched(processedItem) {
        return this.isValidItem(processedItem) && this.getItemLabel(processedItem).toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase());
    }
    isVisibleItem(processedItem) {
        return !!processedItem && (processedItem.level === 0 || this.isItemActive(processedItem)) && this.isItemVisible(processedItem);
    }
    isValidItem(processedItem) {
        return !!processedItem && !this.isItemDisabled(processedItem) && !processedItem.separator;
    }
    findFirstItem() {
        return this.visibleItems().find((processedItem) => this.isValidItem(processedItem));
    }
    findLastItem() {
        return ObjectUtils.findLast(this.visibleItems(), (processedItem) => this.isValidItem(processedItem));
    }
    createProcessedItems(items, level = 0, parent = {}, parentKey = '') {
        const processedItems = [];
        items &&
            items.forEach((item, index) => {
                const key = (parentKey !== '' ? parentKey + '_' : '') + index;
                const newItem = {
                    icon: item.icon,
                    expanded: item.expanded,
                    separator: item.separator,
                    item,
                    index,
                    level,
                    key,
                    parent,
                    parentKey
                };
                newItem['items'] = this.createProcessedItems(item.items, level + 1, newItem, key);
                processedItems.push(newItem);
            });
        return processedItems;
    }
    findProcessedItemByItemKey(key, processedItems, level = 0) {
        processedItems = processedItems || this.processedItems();
        if (processedItems && processedItems.length) {
            for (let i = 0; i < processedItems.length; i++) {
                const processedItem = processedItems[i];
                if (this.getItemProp(processedItem, 'key') === key)
                    return processedItem;
                const matchedItem = this.findProcessedItemByItemKey(key, processedItem.items, level + 1);
                if (matchedItem)
                    return matchedItem;
            }
        }
    }
    flatItems(processedItems, processedFlattenItems = []) {
        processedItems &&
            processedItems.forEach((processedItem) => {
                if (this.isVisibleItem(processedItem)) {
                    processedFlattenItems.push(processedItem);
                    this.flatItems(processedItem.items, processedFlattenItems);
                }
            });
        return processedFlattenItems;
    }
    changeFocusedItem(event) {
        const { originalEvent, processedItem, focusOnNext, selfCheck, allowHeaderFocus = true } = event;
        if (ObjectUtils.isNotEmpty(this.focusedItem()) && this.focusedItem().key !== processedItem.key) {
            this.focusedItem.set(processedItem);
            this.scrollInView();
        }
        else if (allowHeaderFocus) {
            this.headerFocus.emit({ originalEvent, focusOnNext, selfCheck });
        }
    }
    scrollInView() {
        const element = DomHandler.findSingle(this.subMenuViewChild.listViewChild.nativeElement, `li[id="${`${this.focusedItemId}`}"]`);
        if (element) {
            element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
    }
    onFocus(event) {
        if (!this.focused) {
            this.focused = true;
            const focusedItem = this.focusedItem() || (this.isElementInPanel(event, event.relatedTarget) ? this.findFirstItem() : this.findLastItem());
            if (event.relatedTarget !== null)
                this.focusedItem.set(focusedItem);
        }
    }
    onBlur(event) {
        const target = event.relatedTarget;
        if (this.focused && !this.el.nativeElement.contains(target)) {
            this.focused = false;
            this.focusedItem.set(null);
            this.searchValue = '';
        }
    }
    onItemToggle(event) {
        const { processedItem, expanded } = event;
        processedItem.expanded = !processedItem.expanded;
        const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== processedItem.parentKey);
        expanded && activeItemPath.push(processedItem);
        this.activeItemPath.set(activeItemPath);
        this.processedItems.update((value) => value.map((i) => (i === processedItem ? processedItem : i)));
        this.focusedItem.set(processedItem);
    }
    onKeyDown(event) {
        const metaKey = event.metaKey || event.ctrlKey;
        switch (event.code) {
            case 'ArrowDown':
                this.onArrowDownKey(event);
                break;
            case 'ArrowUp':
                this.onArrowUpKey(event);
                break;
            case 'ArrowLeft':
                this.onArrowLeftKey(event);
                break;
            case 'ArrowRight':
                this.onArrowRightKey(event);
                break;
            case 'Home':
                this.onHomeKey(event);
                break;
            case 'End':
                this.onEndKey(event);
                break;
            case 'Space':
                this.onSpaceKey(event);
                break;
            case 'Enter':
                this.onEnterKey(event);
                break;
            case 'Escape':
            case 'Tab':
            case 'PageDown':
            case 'PageUp':
            case 'Backspace':
            case 'ShiftLeft':
            case 'ShiftRight':
                //NOOP
                break;
            default:
                if (!metaKey && ObjectUtils.isPrintableCharacter(event.key)) {
                    this.searchItems(event, event.key);
                }
                break;
        }
    }
    onArrowDownKey(event) {
        const processedItem = ObjectUtils.isNotEmpty(this.focusedItem()) ? this.findNextItem(this.focusedItem()) : this.findFirstItem();
        this.changeFocusedItem({ originalEvent: event, processedItem, focusOnNext: true });
        event.preventDefault();
    }
    onArrowUpKey(event) {
        const processedItem = ObjectUtils.isNotEmpty(this.focusedItem()) ? this.findPrevItem(this.focusedItem()) : this.findLastItem();
        this.changeFocusedItem({ originalEvent: event, processedItem, selfCheck: true });
        event.preventDefault();
    }
    onArrowLeftKey(event) {
        if (ObjectUtils.isNotEmpty(this.focusedItem())) {
            const matched = this.activeItemPath().some((p) => p.key === this.focusedItem().key);
            if (matched) {
                const activeItemPath = this.activeItemPath().filter((p) => p.key !== this.focusedItem().key);
                this.activeItemPath.set(activeItemPath);
            }
            else {
                const focusedItem = ObjectUtils.isNotEmpty(this.focusedItem().parent) ? this.focusedItem().parent : this.focusedItem();
                this.focusedItem.set(focusedItem);
            }
            event.preventDefault();
        }
    }
    onArrowRightKey(event) {
        if (ObjectUtils.isNotEmpty(this.focusedItem())) {
            const grouped = this.isItemGroup(this.focusedItem());
            if (grouped) {
                const matched = this.activeItemPath().some((p) => p.key === this.focusedItem().key);
                if (matched) {
                    this.onArrowDownKey(event);
                }
                else {
                    const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== this.focusedItem().parentKey);
                    activeItemPath.push(this.focusedItem());
                    this.activeItemPath.set(activeItemPath);
                }
            }
            event.preventDefault();
        }
    }
    onHomeKey(event) {
        this.changeFocusedItem({ originalEvent: event, processedItem: this.findFirstItem(), allowHeaderFocus: false });
        event.preventDefault();
    }
    onEndKey(event) {
        this.changeFocusedItem({ originalEvent: event, processedItem: this.findLastItem(), focusOnNext: true, allowHeaderFocus: false });
        event.preventDefault();
    }
    onEnterKey(event) {
        if (ObjectUtils.isNotEmpty(this.focusedItem())) {
            const element = DomHandler.findSingle(this.subMenuViewChild.listViewChild.nativeElement, `li[id="${`${this.focusedItemId}`}"]`);
            const anchorElement = element && (DomHandler.findSingle(element, '[data-pc-section="action"]') || DomHandler.findSingle(element, 'a,button'));
            anchorElement ? anchorElement.click() : element && element.click();
        }
        event.preventDefault();
    }
    onSpaceKey(event) {
        this.onEnterKey(event);
    }
    findNextItem(processedItem) {
        const index = this.visibleItems().findIndex((item) => item.key === processedItem.key);
        const matchedItem = index < this.visibleItems().length - 1
            ? this.visibleItems()
                .slice(index + 1)
                .find((pItem) => this.isValidItem(pItem))
            : undefined;
        return matchedItem || processedItem;
    }
    findPrevItem(processedItem) {
        const index = this.visibleItems().findIndex((item) => item.key === processedItem.key);
        const matchedItem = index > 0 ? ObjectUtils.findLast(this.visibleItems().slice(0, index), (pItem) => this.isValidItem(pItem)) : undefined;
        return matchedItem || processedItem;
    }
    searchItems(event, char) {
        this.searchValue = (this.searchValue || '') + char;
        let matchedItem = null;
        let matched = false;
        if (ObjectUtils.isNotEmpty(this.focusedItem())) {
            const focusedItemIndex = this.visibleItems().findIndex((processedItem) => processedItem.key === this.focusedItem().key);
            matchedItem = this.visibleItems()
                .slice(focusedItemIndex)
                .find((processedItem) => this.isItemMatched(processedItem));
            matchedItem = ObjectUtils.isEmpty(matchedItem)
                ? this.visibleItems()
                    .slice(0, focusedItemIndex)
                    .find((processedItem) => this.isItemMatched(processedItem))
                : matchedItem;
        }
        else {
            matchedItem = this.visibleItems().find((processedItem) => this.isItemMatched(processedItem));
        }
        if (ObjectUtils.isNotEmpty(matchedItem)) {
            matched = true;
        }
        if (ObjectUtils.isEmpty(matchedItem) && ObjectUtils.isEmpty(this.focusedItem())) {
            matchedItem = this.findFirstItem();
        }
        if (ObjectUtils.isNotEmpty(matchedItem)) {
            this.changeFocusedItem({
                originalEvent: event,
                processedItem: matchedItem,
                allowHeaderFocus: false
            });
        }
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        this.searchTimeout = setTimeout(() => {
            this.searchValue = '';
            this.searchTimeout = null;
        }, 500);
        return matched;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: PanelMenuList, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.2", type: PanelMenuList, selector: "p-panelMenuList", inputs: { panelId: "panelId", id: "id", items: "items", itemTemplate: "itemTemplate", parentExpanded: "parentExpanded", expanded: "expanded", transitionOptions: "transitionOptions", root: "root", tabindex: "tabindex", activeItem: "activeItem" }, outputs: { itemToggle: "itemToggle", headerFocus: "headerFocus" }, host: { classAttribute: "p-element" }, viewQueries: [{ propertyName: "subMenuViewChild", first: true, predicate: ["submenu"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
        <p-panelMenuSub
            #submenu
            [root]="true"
            [id]="panelId + '_list'"
            [panelId]="panelId"
            [tabindex]="tabindex"
            [itemTemplate]="itemTemplate"
            [focusedItemId]="focused ? focusedItemId : undefined"
            [activeItemPath]="activeItemPath()"
            [transitionOptions]="transitionOptions"
            [items]="processedItems()"
            [parentExpanded]="parentExpanded"
            (itemToggle)="onItemToggle($event)"
            (keydown)="onKeyDown($event)"
            (menuFocus)="onFocus($event)"
            (menuBlur)="onBlur($event)"
        ></p-panelMenuSub>
    `, isInline: true, styles: ["@layer primeng{.p-panelmenu .p-panelmenu-header-action{display:flex;align-items:center;-webkit-user-select:none;user-select:none;cursor:pointer;position:relative;text-decoration:none}.p-panelmenu .p-panelmenu-header-action:focus{z-index:1}.p-panelmenu .p-submenu-list{margin:0;padding:0;list-style:none}.p-panelmenu .p-menuitem-link{display:flex;align-items:center;-webkit-user-select:none;user-select:none;cursor:pointer;text-decoration:none;position:relative;overflow:hidden;outline:none}.p-panelmenu .p-menuitem-text{line-height:1}.p-panelmenu-expanded.p-toggleable-content:not(.ng-animating),.p-panelmenu .p-submenu-expanded:not(.ng-animating){overflow:visible}.p-panelmenu .p-toggleable-content,.p-panelmenu .p-submenu-list{overflow:hidden}}\n"], dependencies: [{ kind: "component", type: PanelMenuSub, selector: "p-panelMenuSub", inputs: ["panelId", "focusedItemId", "items", "itemTemplate", "level", "activeItemPath", "root", "tabindex", "transitionOptions", "parentExpanded"], outputs: ["itemToggle", "menuFocus", "menuBlur", "menuKeyDown"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: PanelMenuList, decorators: [{
            type: Component,
            args: [{ selector: 'p-panelMenuList', template: `
        <p-panelMenuSub
            #submenu
            [root]="true"
            [id]="panelId + '_list'"
            [panelId]="panelId"
            [tabindex]="tabindex"
            [itemTemplate]="itemTemplate"
            [focusedItemId]="focused ? focusedItemId : undefined"
            [activeItemPath]="activeItemPath()"
            [transitionOptions]="transitionOptions"
            [items]="processedItems()"
            [parentExpanded]="parentExpanded"
            (itemToggle)="onItemToggle($event)"
            (keydown)="onKeyDown($event)"
            (menuFocus)="onFocus($event)"
            (menuBlur)="onBlur($event)"
        ></p-panelMenuSub>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-panelmenu .p-panelmenu-header-action{display:flex;align-items:center;-webkit-user-select:none;user-select:none;cursor:pointer;position:relative;text-decoration:none}.p-panelmenu .p-panelmenu-header-action:focus{z-index:1}.p-panelmenu .p-submenu-list{margin:0;padding:0;list-style:none}.p-panelmenu .p-menuitem-link{display:flex;align-items:center;-webkit-user-select:none;user-select:none;cursor:pointer;text-decoration:none;position:relative;overflow:hidden;outline:none}.p-panelmenu .p-menuitem-text{line-height:1}.p-panelmenu-expanded.p-toggleable-content:not(.ng-animating),.p-panelmenu .p-submenu-expanded:not(.ng-animating){overflow:visible}.p-panelmenu .p-toggleable-content,.p-panelmenu .p-submenu-list{overflow:hidden}}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { panelId: [{
                type: Input
            }], id: [{
                type: Input
            }], items: [{
                type: Input
            }], itemTemplate: [{
                type: Input
            }], parentExpanded: [{
                type: Input
            }], expanded: [{
                type: Input
            }], transitionOptions: [{
                type: Input
            }], root: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], activeItem: [{
                type: Input
            }], itemToggle: [{
                type: Output
            }], headerFocus: [{
                type: Output
            }], subMenuViewChild: [{
                type: ViewChild,
                args: ['submenu']
            }] } });
/**
 * PanelMenu is a hybrid of Accordion and Tree components.
 * @group Components
 */
export class PanelMenu {
    cd;
    /**
     * An array of menuitems.
     * @group Props
     */
    model;
    /**
     * Inline style of the component.
     * @group Props
     */
    style;
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass;
    /**
     * Whether multiple tabs can be activated at the same time or not.
     * @group Props
     */
    multiple = false;
    /**
     * Transition options of the animation.
     * @group Props
     */
    transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
    /**
     * Current id state as a string.
     * @group Props
     */
    id;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = 0;
    templates;
    containerViewChild;
    submenuIconTemplate;
    itemTemplate;
    animating;
    activeItem = signal(null);
    ngOnInit() {
        this.id = this.id || UniqueComponentId();
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'submenuicon':
                    this.submenuIconTemplate = item.template;
                    break;
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    constructor(cd) {
        this.cd = cd;
    }
    /**
     * Collapses open panels.
     * @group Method
     */
    collapseAll() {
        for (let item of this.model) {
            if (item.expanded) {
                item.expanded = false;
            }
        }
        this.cd.detectChanges();
    }
    onToggleDone() {
        this.animating = false;
    }
    changeActiveItem(event, item, index, selfActive = false) {
        if (!this.isItemDisabled(item)) {
            const activeItem = selfActive ? item : this.activeItem && ObjectUtils.equals(item, this.activeItem) ? null : item;
            this.activeItem.set(activeItem);
        }
    }
    getAnimation(item) {
        return item.expanded ? { value: 'visible', params: { transitionParams: this.animating ? this.transitionOptions : '0ms', height: '*' } } : { value: 'hidden', params: { transitionParams: this.transitionOptions, height: '0' } };
    }
    getItemProp(item, name) {
        return item ? ObjectUtils.getItemValue(item[name]) : undefined;
    }
    getItems(item) {
        return item ? [...ObjectUtils.getItemValue(item['items'])] : undefined;
    }
    getItemLabel(item) {
        return this.getItemProp(item, 'label');
    }
    isItemActive(item) {
        return item.expanded;
    }
    isItemVisible(item) {
        return this.getItemProp(item, 'visible') !== false;
    }
    isItemDisabled(item) {
        return this.getItemProp(item, 'disabled');
    }
    isItemGroup(item) {
        return ObjectUtils.isNotEmpty(item.items);
    }
    getPanelId(index, item) {
        return item && item.id ? item.id : `${this.id}_${index}`;
    }
    getHeaderId(item, index) {
        return item.id ? item.id + '_header' : `${this.getPanelId(index)}_header`;
    }
    getContentId(item, index) {
        return item.id ? item.id + '_content' : `${this.getPanelId(index)}_content`;
    }
    updateFocusedHeader(event) {
        const { originalEvent, focusOnNext, selfCheck } = event;
        const panelElement = originalEvent.currentTarget.closest('[data-pc-section="panel"]');
        const header = selfCheck ? DomHandler.findSingle(panelElement, '[data-pc-section="header"]') : focusOnNext ? this.findNextHeader(panelElement) : this.findPrevHeader(panelElement);
        header ? this.changeFocusedHeader(originalEvent, header) : focusOnNext ? this.onHeaderHomeKey(originalEvent) : this.onHeaderEndKey(originalEvent);
    }
    changeFocusedHeader(event, element) {
        element && DomHandler.focus(element);
    }
    findNextHeader(panelElement, selfCheck = false) {
        const nextPanelElement = selfCheck ? panelElement : panelElement.nextElementSibling;
        const headerElement = DomHandler.findSingle(nextPanelElement, '[data-pc-section="header"]');
        return headerElement ? (DomHandler.getAttribute(headerElement, 'data-p-disabled') ? this.findNextHeader(headerElement.parentElement) : headerElement) : null;
    }
    findPrevHeader(panelElement, selfCheck = false) {
        const prevPanelElement = selfCheck ? panelElement : panelElement.previousElementSibling;
        const headerElement = DomHandler.findSingle(prevPanelElement, '[data-pc-section="header"]');
        return headerElement ? (DomHandler.getAttribute(headerElement, 'data-p-disabled') ? this.findPrevHeader(headerElement.parentElement) : headerElement) : null;
    }
    findFirstHeader() {
        return this.findNextHeader(this.containerViewChild.nativeElement.firstElementChild, true);
    }
    findLastHeader() {
        return this.findPrevHeader(this.containerViewChild.nativeElement.lastElementChild, true);
    }
    onHeaderClick(event, item, index) {
        if (this.isItemDisabled(item)) {
            event.preventDefault();
            return;
        }
        if (item.command) {
            item.command({ originalEvent: event, item });
        }
        if (!this.multiple) {
            for (let modelItem of this.model) {
                if (item !== modelItem && modelItem.expanded) {
                    modelItem.expanded = false;
                }
            }
        }
        item.expanded = !item.expanded;
        this.changeActiveItem(event, item, index);
        this.animating = true;
        DomHandler.focus(event.currentTarget);
    }
    onHeaderKeyDown(event, item, index) {
        switch (event.code) {
            case 'ArrowDown':
                this.onHeaderArrowDownKey(event);
                break;
            case 'ArrowUp':
                this.onHeaderArrowUpKey(event);
                break;
            case 'Home':
                this.onHeaderHomeKey(event);
                break;
            case 'End':
                this.onHeaderEndKey(event);
                break;
            case 'Enter':
            case 'Space':
                this.onHeaderEnterKey(event, item, index);
                break;
            default:
                break;
        }
    }
    onHeaderArrowDownKey(event) {
        const rootList = DomHandler.getAttribute(event.currentTarget, 'data-p-highlight') === true ? DomHandler.findSingle(event.currentTarget.nextElementSibling, '[data-pc-section="menu"]') : null;
        rootList ? DomHandler.focus(rootList) : this.updateFocusedHeader({ originalEvent: event, focusOnNext: true });
        event.preventDefault();
    }
    onHeaderArrowUpKey(event) {
        const prevHeader = this.findPrevHeader(event.currentTarget.parentElement) || this.findLastHeader();
        const rootList = DomHandler.getAttribute(prevHeader, 'data-p-highlight') === true ? DomHandler.findSingle(prevHeader.nextElementSibling, '[data-pc-section="menu"]') : null;
        rootList ? DomHandler.focus(rootList) : this.updateFocusedHeader({ originalEvent: event, focusOnNext: false });
        event.preventDefault();
    }
    onHeaderHomeKey(event) {
        this.changeFocusedHeader(event, this.findFirstHeader());
        event.preventDefault();
    }
    onHeaderEndKey(event) {
        this.changeFocusedHeader(event, this.findLastHeader());
        event.preventDefault();
    }
    onHeaderEnterKey(event, item, index) {
        const headerAction = DomHandler.findSingle(event.currentTarget, '[data-pc-section="headeraction"]');
        headerAction ? headerAction.click() : this.onHeaderClick(event, item, index);
        event.preventDefault();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: PanelMenu, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.2", type: PanelMenu, selector: "p-panelMenu", inputs: { model: "model", style: "style", styleClass: "styleClass", multiple: "multiple", transitionOptions: "transitionOptions", id: "id", tabindex: "tabindex" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-panelmenu p-component'" #container>
            <ng-container *ngFor="let item of model; let f = first; let l = last; let i = index">
                <div *ngIf="isItemVisible(item)" class="p-panelmenu-panel" [ngClass]="getItemProp(item, 'headerClass')" [ngStyle]="getItemProp(item, 'style')" [attr.data-pc-section]="'panel'">
                    <div
                        [ngClass]="{ 'p-component p-panelmenu-header': true, 'p-highlight': isItemActive(item), 'p-disabled': isItemDisabled(item) }"
                        [class]="getItemProp(item, 'styleClass')"
                        [ngStyle]="getItemProp(item, 'style')"
                        [pTooltip]="getItemProp(item, 'tooltip')"
                        [attr.id]="getHeaderId(item, i)"
                        [tabindex]="0"
                        role="button"
                        [tooltipOptions]="getItemProp(item, 'tooltipOptions')"
                        [attr.aria-expanded]="isItemActive(item)"
                        [attr.aria-label]="getItemProp(item, 'label')"
                        [attr.aria-controls]="getContentId(item, i)"
                        [attr.aria-disabled]="isItemDisabled(item)"
                        [attr.data-p-highlight]="isItemActive(item)"
                        [attr.data-p-disabled]="isItemDisabled(item)"
                        [attr.data-pc-section]="'header'"
                        (click)="onHeaderClick($event, item, i)"
                        (keydown)="onHeaderKeyDown($event, item, i)"
                    >
                        <div class="p-panelmenu-header-content">
                            <a
                                *ngIf="!getItemProp(item, 'routerLink')"
                                [attr.href]="getItemProp(item, 'url')"
                                [attr.tabindex]="-1"
                                [target]="getItemProp(item, 'target')"
                                [attr.title]="getItemProp(item, 'title')"
                                class="p-panelmenu-header-action"
                                [attr.data-pc-section]="'headeraction'"
                            >
                                <ng-container *ngIf="isItemGroup(item)">
                                    <ng-container *ngIf="!submenuIconTemplate">
                                        <ChevronDownIcon [styleClass]="'p-submenu-icon'" *ngIf="isItemActive(item)" />
                                        <ChevronRightIcon [styleClass]="'p-submenu-icon'" *ngIf="!isItemActive(item)" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="submenuIconTemplate"></ng-template>
                                </ng-container>
                                <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon" [ngStyle]="getItemProp(item, 'iconStyle')"></span>
                                <span class="p-menuitem-text" *ngIf="getItemProp(item, 'escape') !== false; else htmlLabel">{{ getItemProp(item, 'label') }}</span>
                                <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(item, 'label')"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="getItemProp(item, 'badge')" [ngClass]="getItemProp(item, 'badgeStyleClass')">{{ getItemProp(item, 'badge') }}</span>
                            </a>
                            <a
                                *ngIf="getItemProp(item, 'routerLink')"
                                [routerLink]="getItemProp(item, 'routerLink')"
                                [queryParams]="getItemProp(item, 'queryParams')"
                                [routerLinkActive]="'p-menuitem-link-active'"
                                [routerLinkActiveOptions]="getItemProp(item, 'routerLinkActiveOptions') || { exact: false }"
                                [target]="getItemProp(item, 'target')"
                                class="p-panelmenu-header-action"
                                [attr.tabindex]="-1"
                                [fragment]="getItemProp(item, 'fragment')"
                                [queryParamsHandling]="getItemProp(item, 'queryParamsHandling')"
                                [preserveFragment]="getItemProp(item, 'preserveFragment')"
                                [skipLocationChange]="getItemProp(item, 'skipLocationChange')"
                                [replaceUrl]="getItemProp(item, 'replaceUrl')"
                                [state]="getItemProp(item, 'state')"
                                [attr.data-pc-section]="'headeraction'"
                            >
                                <ng-container *ngIf="isItemGroup(item)">
                                    <ng-container *ngIf="!submenuIconTemplate">
                                        <ChevronDownIcon [styleClass]="'p-submenu-icon'" *ngIf="isItemActive(item)" />
                                        <ChevronRightIcon [styleClass]="'p-submenu-icon'" *ngIf="!isItemActive(item)" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="submenuIconTemplate"></ng-template>
                                </ng-container>
                                <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon" [ngStyle]="getItemProp(item, 'iconStyle')"></span>
                                <span class="p-menuitem-text" *ngIf="getItemProp(item, 'escape') !== false; else htmlRouteLabel">{{ getItemProp(item, 'label') }}</span>
                                <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(item, 'label')"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="getItemProp(item, 'badge')" [ngClass]="getItemProp(item, 'badgeStyleClass')">{{ getItemProp(item, 'badge') }}</span>
                            </a>
                        </div>
                    </div>
                    <div
                        *ngIf="isItemGroup(item)"
                        class="p-toggleable-content"
                        [ngClass]="{ 'p-panelmenu-expanded': isItemActive(item) }"
                        [@rootItem]="getAnimation(item)"
                        (@rootItem.done)="onToggleDone()"
                        role="region"
                        [attr.id]="getContentId(item, i)"
                        [attr.aria-labelledby]="getHeaderId(item, i)"
                        [attr.data-pc-section]="'toggleablecontent'"
                    >
                        <div class="p-panelmenu-content" [attr.data-pc-section]="'menucontent'">
                            <p-panelMenuList
                                [panelId]="getPanelId(i, item)"
                                [items]="getItems(item)"
                                [itemTemplate]="itemTemplate"
                                [transitionOptions]="transitionOptions"
                                [root]="true"
                                [activeItem]="activeItem()"
                                [tabindex]="tabindex"
                                [parentExpanded]="isItemActive(item)"
                                (headerFocus)="updateFocusedHeader($event)"
                            ></p-panelMenuList>
                        </div>
                    </div>
                </div>
            </ng-container>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-panelmenu .p-panelmenu-header-action{display:flex;align-items:center;-webkit-user-select:none;user-select:none;cursor:pointer;position:relative;text-decoration:none}.p-panelmenu .p-panelmenu-header-action:focus{z-index:1}.p-panelmenu .p-submenu-list{margin:0;padding:0;list-style:none}.p-panelmenu .p-menuitem-link{display:flex;align-items:center;-webkit-user-select:none;user-select:none;cursor:pointer;text-decoration:none;position:relative;overflow:hidden;outline:none}.p-panelmenu .p-menuitem-text{line-height:1}.p-panelmenu-expanded.p-toggleable-content:not(.ng-animating),.p-panelmenu .p-submenu-expanded:not(.ng-animating){overflow:visible}.p-panelmenu .p-toggleable-content,.p-panelmenu .p-submenu-list{overflow:hidden}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i2.RouterLink), selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i0.forwardRef(() => i2.RouterLinkActive), selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "directive", type: i0.forwardRef(() => i3.Tooltip), selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "autoHide", "fitContent", "hideOnEscape", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { kind: "component", type: i0.forwardRef(() => ChevronDownIcon), selector: "ChevronDownIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronRightIcon), selector: "ChevronRightIcon" }, { kind: "component", type: i0.forwardRef(() => PanelMenuList), selector: "p-panelMenuList", inputs: ["panelId", "id", "items", "itemTemplate", "parentExpanded", "expanded", "transitionOptions", "root", "tabindex", "activeItem"], outputs: ["itemToggle", "headerFocus"] }], animations: [
            trigger('rootItem', [
                state('hidden', style({
                    height: '0'
                })),
                state('visible', style({
                    height: '*'
                })),
                transition('visible <=> hidden', [animate('{{transitionParams}}')]),
                transition('void => *', animate(0))
            ])
        ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: PanelMenu, decorators: [{
            type: Component,
            args: [{ selector: 'p-panelMenu', template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-panelmenu p-component'" #container>
            <ng-container *ngFor="let item of model; let f = first; let l = last; let i = index">
                <div *ngIf="isItemVisible(item)" class="p-panelmenu-panel" [ngClass]="getItemProp(item, 'headerClass')" [ngStyle]="getItemProp(item, 'style')" [attr.data-pc-section]="'panel'">
                    <div
                        [ngClass]="{ 'p-component p-panelmenu-header': true, 'p-highlight': isItemActive(item), 'p-disabled': isItemDisabled(item) }"
                        [class]="getItemProp(item, 'styleClass')"
                        [ngStyle]="getItemProp(item, 'style')"
                        [pTooltip]="getItemProp(item, 'tooltip')"
                        [attr.id]="getHeaderId(item, i)"
                        [tabindex]="0"
                        role="button"
                        [tooltipOptions]="getItemProp(item, 'tooltipOptions')"
                        [attr.aria-expanded]="isItemActive(item)"
                        [attr.aria-label]="getItemProp(item, 'label')"
                        [attr.aria-controls]="getContentId(item, i)"
                        [attr.aria-disabled]="isItemDisabled(item)"
                        [attr.data-p-highlight]="isItemActive(item)"
                        [attr.data-p-disabled]="isItemDisabled(item)"
                        [attr.data-pc-section]="'header'"
                        (click)="onHeaderClick($event, item, i)"
                        (keydown)="onHeaderKeyDown($event, item, i)"
                    >
                        <div class="p-panelmenu-header-content">
                            <a
                                *ngIf="!getItemProp(item, 'routerLink')"
                                [attr.href]="getItemProp(item, 'url')"
                                [attr.tabindex]="-1"
                                [target]="getItemProp(item, 'target')"
                                [attr.title]="getItemProp(item, 'title')"
                                class="p-panelmenu-header-action"
                                [attr.data-pc-section]="'headeraction'"
                            >
                                <ng-container *ngIf="isItemGroup(item)">
                                    <ng-container *ngIf="!submenuIconTemplate">
                                        <ChevronDownIcon [styleClass]="'p-submenu-icon'" *ngIf="isItemActive(item)" />
                                        <ChevronRightIcon [styleClass]="'p-submenu-icon'" *ngIf="!isItemActive(item)" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="submenuIconTemplate"></ng-template>
                                </ng-container>
                                <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon" [ngStyle]="getItemProp(item, 'iconStyle')"></span>
                                <span class="p-menuitem-text" *ngIf="getItemProp(item, 'escape') !== false; else htmlLabel">{{ getItemProp(item, 'label') }}</span>
                                <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(item, 'label')"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="getItemProp(item, 'badge')" [ngClass]="getItemProp(item, 'badgeStyleClass')">{{ getItemProp(item, 'badge') }}</span>
                            </a>
                            <a
                                *ngIf="getItemProp(item, 'routerLink')"
                                [routerLink]="getItemProp(item, 'routerLink')"
                                [queryParams]="getItemProp(item, 'queryParams')"
                                [routerLinkActive]="'p-menuitem-link-active'"
                                [routerLinkActiveOptions]="getItemProp(item, 'routerLinkActiveOptions') || { exact: false }"
                                [target]="getItemProp(item, 'target')"
                                class="p-panelmenu-header-action"
                                [attr.tabindex]="-1"
                                [fragment]="getItemProp(item, 'fragment')"
                                [queryParamsHandling]="getItemProp(item, 'queryParamsHandling')"
                                [preserveFragment]="getItemProp(item, 'preserveFragment')"
                                [skipLocationChange]="getItemProp(item, 'skipLocationChange')"
                                [replaceUrl]="getItemProp(item, 'replaceUrl')"
                                [state]="getItemProp(item, 'state')"
                                [attr.data-pc-section]="'headeraction'"
                            >
                                <ng-container *ngIf="isItemGroup(item)">
                                    <ng-container *ngIf="!submenuIconTemplate">
                                        <ChevronDownIcon [styleClass]="'p-submenu-icon'" *ngIf="isItemActive(item)" />
                                        <ChevronRightIcon [styleClass]="'p-submenu-icon'" *ngIf="!isItemActive(item)" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="submenuIconTemplate"></ng-template>
                                </ng-container>
                                <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon" [ngStyle]="getItemProp(item, 'iconStyle')"></span>
                                <span class="p-menuitem-text" *ngIf="getItemProp(item, 'escape') !== false; else htmlRouteLabel">{{ getItemProp(item, 'label') }}</span>
                                <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(item, 'label')"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="getItemProp(item, 'badge')" [ngClass]="getItemProp(item, 'badgeStyleClass')">{{ getItemProp(item, 'badge') }}</span>
                            </a>
                        </div>
                    </div>
                    <div
                        *ngIf="isItemGroup(item)"
                        class="p-toggleable-content"
                        [ngClass]="{ 'p-panelmenu-expanded': isItemActive(item) }"
                        [@rootItem]="getAnimation(item)"
                        (@rootItem.done)="onToggleDone()"
                        role="region"
                        [attr.id]="getContentId(item, i)"
                        [attr.aria-labelledby]="getHeaderId(item, i)"
                        [attr.data-pc-section]="'toggleablecontent'"
                    >
                        <div class="p-panelmenu-content" [attr.data-pc-section]="'menucontent'">
                            <p-panelMenuList
                                [panelId]="getPanelId(i, item)"
                                [items]="getItems(item)"
                                [itemTemplate]="itemTemplate"
                                [transitionOptions]="transitionOptions"
                                [root]="true"
                                [activeItem]="activeItem()"
                                [tabindex]="tabindex"
                                [parentExpanded]="isItemActive(item)"
                                (headerFocus)="updateFocusedHeader($event)"
                            ></p-panelMenuList>
                        </div>
                    </div>
                </div>
            </ng-container>
        </div>
    `, animations: [
                        trigger('rootItem', [
                            state('hidden', style({
                                height: '0'
                            })),
                            state('visible', style({
                                height: '*'
                            })),
                            transition('visible <=> hidden', [animate('{{transitionParams}}')]),
                            transition('void => *', animate(0))
                        ])
                    ], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-panelmenu .p-panelmenu-header-action{display:flex;align-items:center;-webkit-user-select:none;user-select:none;cursor:pointer;position:relative;text-decoration:none}.p-panelmenu .p-panelmenu-header-action:focus{z-index:1}.p-panelmenu .p-submenu-list{margin:0;padding:0;list-style:none}.p-panelmenu .p-menuitem-link{display:flex;align-items:center;-webkit-user-select:none;user-select:none;cursor:pointer;text-decoration:none;position:relative;overflow:hidden;outline:none}.p-panelmenu .p-menuitem-text{line-height:1}.p-panelmenu-expanded.p-toggleable-content:not(.ng-animating),.p-panelmenu .p-submenu-expanded:not(.ng-animating){overflow:visible}.p-panelmenu .p-toggleable-content,.p-panelmenu .p-submenu-list{overflow:hidden}}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }], propDecorators: { model: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], multiple: [{
                type: Input
            }], transitionOptions: [{
                type: Input
            }], id: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container']
            }] } });
export class PanelMenuModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: PanelMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.2", ngImport: i0, type: PanelMenuModule, declarations: [PanelMenu, PanelMenuSub, PanelMenuList], imports: [CommonModule, RouterModule, TooltipModule, SharedModule, AngleDownIcon, AngleRightIcon, ChevronDownIcon, ChevronRightIcon], exports: [PanelMenu, RouterModule, TooltipModule, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: PanelMenuModule, imports: [CommonModule, RouterModule, TooltipModule, SharedModule, AngleDownIcon, AngleRightIcon, ChevronDownIcon, ChevronRightIcon, RouterModule, TooltipModule, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: PanelMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, TooltipModule, SharedModule, AngleDownIcon, AngleRightIcon, ChevronDownIcon, ChevronRightIcon],
                    exports: [PanelMenu, RouterModule, TooltipModule, SharedModule],
                    declarations: [PanelMenu, PanelMenuSub, PanelMenuList]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWxtZW51LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3BhbmVsbWVudS9wYW5lbG1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUVILHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsZUFBZSxFQUVmLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFFUixNQUFNLEVBSU4sU0FBUyxFQUNULGlCQUFpQixFQUNqQixRQUFRLEVBQ1IsVUFBVSxFQUNWLE1BQU0sRUFDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFZLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDcEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUEwSS9ELE1BQU0sT0FBTyxZQUFZO0lBK0JtQztJQUE2QjtJQTlCNUUsT0FBTyxDQUFxQjtJQUU1Qixh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QUUsZUFBZSxFQUFFLGdCQUFnQixhQXBRMUgsU0FBUyxFQXFRRyxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVk7d0dBR3JELGVBQWUsWUFKZCxZQUFZLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQzlHLFlBQVksRUFBRSxhQUFhLEVBQUUsWUFBWTs7MkZBR3JELGVBQWU7a0JBTDNCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixDQUFDO29CQUNwSSxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZLENBQUM7b0JBQy9ELFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsYUFBYSxDQUFDO2lCQUN6RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFuaW1hdGUsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBOZ01vZHVsZSxcbiAgICBPbkNoYW5nZXMsXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBjb21wdXRlZCxcbiAgICBmb3J3YXJkUmVmLFxuICAgIHNpZ25hbFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBNZW51SXRlbSwgUHJpbWVUZW1wbGF0ZSwgU2hhcmVkTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IEFuZ2xlRG93bkljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2FuZ2xlZG93bic7XG5pbXBvcnQgeyBBbmdsZVJpZ2h0SWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvYW5nbGVyaWdodCc7XG5pbXBvcnQgeyBDaGV2cm9uRG93bkljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2NoZXZyb25kb3duJztcbmltcG9ydCB7IENoZXZyb25SaWdodEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2NoZXZyb25yaWdodCc7XG5pbXBvcnQgeyBUb29sdGlwTW9kdWxlIH0gZnJvbSAncHJpbWVuZy90b29sdGlwJztcbmltcG9ydCB7IE9iamVjdFV0aWxzLCBVbmlxdWVDb21wb25lbnRJZCB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtcGFuZWxNZW51U3ViJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8dWxcbiAgICAgICAgICAgICNsaXN0XG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLXN1Ym1lbnUtbGlzdCc6IHRydWUsICdwLXBhbmVsbWVudS1yb290LWxpc3QnOiByb290IH1cIlxuICAgICAgICAgICAgcm9sZT1cInRyZWVcIlxuICAgICAgICAgICAgW3RhYmluZGV4XT1cIi0xXCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtYWN0aXZlZGVzY2VuZGFudF09XCJmb2N1c2VkSXRlbUlkXCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbWVudSdcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1oaWRkZW5dPVwiIXBhcmVudEV4cGFuZGVkXCJcbiAgICAgICAgICAgIChmb2N1c2luKT1cIm1lbnVGb2N1cy5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAgKGZvY3Vzb3V0KT1cIm1lbnVCbHVyLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAoa2V5ZG93bik9XCJtZW51S2V5RG93bi5lbWl0KCRldmVudClcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LXByb2Nlc3NlZEl0ZW0gbGV0LWluZGV4PVwiaW5kZXhcIiBbbmdGb3JPZl09XCJpdGVtc1wiPlxuICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cInByb2Nlc3NlZEl0ZW0uc2VwYXJhdG9yXCIgY2xhc3M9XCJwLW1lbnVpdGVtLXNlcGFyYXRvclwiIHJvbGU9XCJzZXBhcmF0b3JcIj48L2xpPlxuICAgICAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cIiFwcm9jZXNzZWRJdGVtLnNlcGFyYXRvciAmJiBpc0l0ZW1WaXNpYmxlKHByb2Nlc3NlZEl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiZ2V0SXRlbUNsYXNzKHByb2Nlc3NlZEl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cInRyZWVpdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuaWRdPVwiZ2V0SXRlbUlkKHByb2Nlc3NlZEl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnbGFiZWwnKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiaXNJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbSkgPyBpc0l0ZW1BY3RpdmUocHJvY2Vzc2VkSXRlbSkgOiB1bmRlZmluZWRcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxldmVsXT1cImxldmVsICsgMVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtc2V0c2l6ZV09XCJnZXRBcmlhU2V0U2l6ZSgpXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1wb3NpbnNldF09XCJnZXRBcmlhUG9zSW5zZXQoaW5kZXgpXCJcbiAgICAgICAgICAgICAgICAgICAgW2NsYXNzXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdzdHlsZUNsYXNzJylcIlxuICAgICAgICAgICAgICAgICAgICBbY2xhc3MucC1oaWRkZW5dPVwicHJvY2Vzc2VkSXRlbS52aXNpYmxlID09PSBmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzcy5wLWZvY3VzXT1cImlzSXRlbUZvY3VzZWQocHJvY2Vzc2VkSXRlbSkgJiYgIWlzSXRlbURpc2FibGVkKHByb2Nlc3NlZEl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgW25nU3R5bGVdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3N0eWxlJylcIlxuICAgICAgICAgICAgICAgICAgICBbcFRvb2x0aXBdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3Rvb2x0aXAnKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcC1kaXNhYmxlZF09XCJpc0l0ZW1EaXNhYmxlZChwcm9jZXNzZWRJdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgIFt0b29sdGlwT3B0aW9uc109XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAndG9vbHRpcE9wdGlvbnMnKVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1tZW51aXRlbS1jb250ZW50XCIgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudCwgcHJvY2Vzc2VkSXRlbSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaXRlbVRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCIhZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3JvdXRlckxpbmsnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmhyZWZdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3VybCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLW1lbnVpdGVtLWxpbmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLWRpc2FibGVkJzogZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2Rpc2FibGVkJykgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0YXJnZXRdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3RhcmdldCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidhY3Rpb24nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiISFwYXJlbnRFeHBhbmRlZCA/ICcwJyA6ICctMSdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzSXRlbUdyb3VwKHByb2Nlc3NlZEl0ZW0pXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXBhbmVsTWVudS5zdWJtZW51SWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFuZ2xlRG93bkljb24gW3N0eWxlQ2xhc3NdPVwiJ3Atc3VibWVudS1pY29uJ1wiICpuZ0lmPVwiaXNJdGVtQWN0aXZlKHByb2Nlc3NlZEl0ZW0pXCIgW25nU3R5bGVdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2ljb25TdHlsZScpXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QW5nbGVSaWdodEljb24gW3N0eWxlQ2xhc3NdPVwiJ3Atc3VibWVudS1pY29uJ1wiICpuZ0lmPVwiIWlzSXRlbUFjdGl2ZShwcm9jZXNzZWRJdGVtKVwiIFtuZ1N0eWxlXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdpY29uU3R5bGUnKVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cInBhbmVsTWVudS5zdWJtZW51SWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS1pY29uXCIgW25nQ2xhc3NdPVwicHJvY2Vzc2VkSXRlbS5pY29uXCIgKm5nSWY9XCJwcm9jZXNzZWRJdGVtLmljb25cIiBbbmdTdHlsZV09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnaWNvblN0eWxlJylcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCIgKm5nSWY9XCJwcm9jZXNzZWRJdGVtLml0ZW0/LmVzY2FwZSAhPT0gZmFsc2U7IGVsc2UgaHRtbExhYmVsXCI+e3sgZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2xhYmVsJykgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjaHRtbExhYmVsPjxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCIgW2lubmVySFRNTF09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnbGFiZWwnKVwiPjwvc3Bhbj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tYmFkZ2VcIiAqbmdJZj1cInByb2Nlc3NlZEl0ZW0uYmFkZ2VcIiBbbmdDbGFzc109XCJwcm9jZXNzZWRJdGVtLmJhZGdlU3R5bGVDbGFzc1wiPnt7IHByb2Nlc3NlZEl0ZW0uYmFkZ2UgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3JvdXRlckxpbmsnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyb3V0ZXJMaW5rXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdyb3V0ZXJMaW5rJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcXVlcnlQYXJhbXNdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3F1ZXJ5UGFyYW1zJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcm91dGVyTGlua0FjdGl2ZV09XCIncC1tZW51aXRlbS1saW5rLWFjdGl2ZSdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcm91dGVyTGlua0FjdGl2ZU9wdGlvbnNdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3JvdXRlckxpbmtBY3RpdmVPcHRpb25zJykgfHwgeyBleGFjdDogZmFsc2UgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1tZW51aXRlbS1saW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1kaXNhYmxlZCc6IGdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdkaXNhYmxlZCcpIH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGFyZ2V0XT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICd0YXJnZXQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRpdGxlXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICd0aXRsZScpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2ZyYWdtZW50XT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdmcmFnbWVudCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3F1ZXJ5UGFyYW1zSGFuZGxpbmddPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3F1ZXJ5UGFyYW1zSGFuZGxpbmcnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwcmVzZXJ2ZUZyYWdtZW50XT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdwcmVzZXJ2ZUZyYWdtZW50JylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc2tpcExvY2F0aW9uQ2hhbmdlXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdza2lwTG9jYXRpb25DaGFuZ2UnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyZXBsYWNlVXJsXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdyZXBsYWNlVXJsJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3RhdGVdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3N0YXRlJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2FjdGlvbidcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCIhIXBhcmVudEV4cGFuZGVkID8gJzAnIDogJy0xJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhcGFuZWxNZW51LnN1Ym1lbnVJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QW5nbGVEb3duSWNvbiAqbmdJZj1cImlzSXRlbUFjdGl2ZShwcm9jZXNzZWRJdGVtKVwiIFtzdHlsZUNsYXNzXT1cIidwLXN1Ym1lbnUtaWNvbidcIiBbbmdTdHlsZV09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnaWNvblN0eWxlJylcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBbmdsZVJpZ2h0SWNvbiAqbmdJZj1cIiFpc0l0ZW1BY3RpdmUocHJvY2Vzc2VkSXRlbSlcIiBbc3R5bGVDbGFzc109XCIncC1zdWJtZW51LWljb24nXCIgW25nU3R5bGVdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2ljb25TdHlsZScpXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwicGFuZWxNZW51LnN1Ym1lbnVJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLWljb25cIiBbbmdDbGFzc109XCJwcm9jZXNzZWRJdGVtLmljb25cIiAqbmdJZj1cInByb2Nlc3NlZEl0ZW0uaWNvblwiIFtuZ1N0eWxlXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdpY29uU3R5bGUnKVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiAqbmdJZj1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdlc2NhcGUnKSAhPT0gZmFsc2U7IGVsc2UgaHRtbFJvdXRlTGFiZWxcIj57eyBnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnbGFiZWwnKSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNodG1sUm91dGVMYWJlbD48c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tdGV4dFwiIFtpbm5lckhUTUxdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2xhYmVsJylcIj48L3NwYW4+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLWJhZGdlXCIgKm5nSWY9XCJwcm9jZXNzZWRJdGVtLmJhZGdlXCIgW25nQ2xhc3NdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2JhZGdlU3R5bGVDbGFzcycpXCI+e3sgZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2JhZGdlJykgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXRlbVRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogcHJvY2Vzc2VkSXRlbS5pdGVtIH1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC10b2dnbGVhYmxlLWNvbnRlbnRcIiBbQHN1Ym1lbnVdPVwiZ2V0QW5pbWF0aW9uKHByb2Nlc3NlZEl0ZW0pXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cC1wYW5lbE1lbnVTdWJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImlzSXRlbVZpc2libGUocHJvY2Vzc2VkSXRlbSkgJiYgaXNJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJnZXRJdGVtSWQocHJvY2Vzc2VkSXRlbSkgKyAnX2xpc3QnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcGFuZWxJZF09XCJwYW5lbElkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaXRlbXNdPVwicHJvY2Vzc2VkSXRlbS5pdGVtc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2l0ZW1UZW1wbGF0ZV09XCJpdGVtVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0cmFuc2l0aW9uT3B0aW9uc109XCJ0cmFuc2l0aW9uT3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2ZvY3VzZWRJdGVtSWRdPVwiZm9jdXNlZEl0ZW1JZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2FjdGl2ZUl0ZW1QYXRoXT1cImFjdGl2ZUl0ZW1QYXRoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbGV2ZWxdPVwibGV2ZWwgKyAxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcGFyZW50RXhwYW5kZWRdPVwiISFwYXJlbnRFeHBhbmRlZCAmJiBpc0l0ZW1FeHBhbmRlZChwcm9jZXNzZWRJdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGl0ZW1Ub2dnbGUpPVwib25JdGVtVG9nZ2xlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPjwvcC1wYW5lbE1lbnVTdWI+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L3VsPlxuICAgIGAsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdzdWJtZW51JywgW1xuICAgICAgICAgICAgc3RhdGUoXG4gICAgICAgICAgICAgICAgJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcwJ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgc3RhdGUoXG4gICAgICAgICAgICAgICAgJ3Zpc2libGUnLFxuICAgICAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnKidcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGUgPD0+IGhpZGRlbicsIFthbmltYXRlKCd7e3RyYW5zaXRpb25QYXJhbXN9fScpXSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBhbmltYXRlKDApKVxuICAgICAgICBdKVxuICAgIF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgUGFuZWxNZW51U3ViIHtcbiAgICBASW5wdXQoKSBwYW5lbElkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBmb2N1c2VkSXRlbUlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBpdGVtczogYW55W107XG5cbiAgICBASW5wdXQoKSBpdGVtVGVtcGxhdGU6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgbGV2ZWw6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKSBhY3RpdmVJdGVtUGF0aDogYW55W107XG5cbiAgICBASW5wdXQoKSByb290OiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIHRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBwYXJlbnRFeHBhbmRlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIEBPdXRwdXQoKSBpdGVtVG9nZ2xlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQE91dHB1dCgpIG1lbnVGb2N1czogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIEBPdXRwdXQoKSBtZW51Qmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIEBPdXRwdXQoKSBtZW51S2V5RG93bjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2xpc3QnKSBsaXN0Vmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IFBhbmVsTWVudSkpIHB1YmxpYyBwYW5lbE1lbnU6IFBhbmVsTWVudSwgcHVibGljIGVsOiBFbGVtZW50UmVmKSB7fVxuXG4gICAgZ2V0SXRlbUlkKHByb2Nlc3NlZEl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHByb2Nlc3NlZEl0ZW0uaXRlbT8uaWQgPz8gYCR7dGhpcy5wYW5lbElkfV8ke3Byb2Nlc3NlZEl0ZW0ua2V5fWA7XG4gICAgfVxuXG4gICAgZ2V0SXRlbUtleShwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1JZChwcm9jZXNzZWRJdGVtKTtcbiAgICB9XG5cbiAgICBnZXRJdGVtQ2xhc3MocHJvY2Vzc2VkSXRlbSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3AtbWVudWl0ZW0nOiB0cnVlLFxuICAgICAgICAgICAgJ3AtZGlzYWJsZWQnOiB0aGlzLmlzSXRlbURpc2FibGVkKHByb2Nlc3NlZEl0ZW0pXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgbmFtZT8sIHBhcmFtcz8pIHtcbiAgICAgICAgcmV0dXJuIHByb2Nlc3NlZEl0ZW0gJiYgcHJvY2Vzc2VkSXRlbS5pdGVtID8gT2JqZWN0VXRpbHMuZ2V0SXRlbVZhbHVlKHByb2Nlc3NlZEl0ZW0uaXRlbVtuYW1lXSwgcGFyYW1zKSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXRJdGVtTGFiZWwocHJvY2Vzc2VkSXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnbGFiZWwnKTtcbiAgICB9XG5cbiAgICBpc0l0ZW1FeHBhbmRlZChwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIHJldHVybiBwcm9jZXNzZWRJdGVtLmV4cGFuZGVkO1xuICAgIH1cblxuICAgIGlzSXRlbUFjdGl2ZShwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzSXRlbUV4cGFuZGVkKHByb2Nlc3NlZEl0ZW0pIHx8IHRoaXMuYWN0aXZlSXRlbVBhdGguc29tZSgocGF0aCkgPT4gcGF0aCAmJiBwYXRoLmtleSA9PT0gcHJvY2Vzc2VkSXRlbS5rZXkpO1xuICAgIH1cblxuICAgIGlzSXRlbVZpc2libGUocHJvY2Vzc2VkSXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAndmlzaWJsZScpICE9PSBmYWxzZTtcbiAgICB9XG5cbiAgICBpc0l0ZW1EaXNhYmxlZChwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdkaXNhYmxlZCcpO1xuICAgIH1cblxuICAgIGlzSXRlbUZvY3VzZWQocHJvY2Vzc2VkSXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb2N1c2VkSXRlbUlkID09PSB0aGlzLmdldEl0ZW1JZChwcm9jZXNzZWRJdGVtKTtcbiAgICB9XG5cbiAgICBpc0l0ZW1Hcm91cChwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIHJldHVybiBPYmplY3RVdGlscy5pc05vdEVtcHR5KHByb2Nlc3NlZEl0ZW0uaXRlbXMpO1xuICAgIH1cblxuICAgIGdldEFuaW1hdGlvbihwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzSXRlbUFjdGl2ZShwcm9jZXNzZWRJdGVtKSA/IHsgdmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7IHRyYW5zaXRpb25QYXJhbXM6IHRoaXMudHJhbnNpdGlvbk9wdGlvbnMsIGhlaWdodDogJyonIH0gfSA6IHsgdmFsdWU6ICdoaWRkZW4nLCBwYXJhbXM6IHsgdHJhbnNpdGlvblBhcmFtczogdGhpcy50cmFuc2l0aW9uT3B0aW9ucywgaGVpZ2h0OiAnMCcgfSB9O1xuICAgIH1cblxuICAgIGdldEFyaWFTZXRTaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5maWx0ZXIoKHByb2Nlc3NlZEl0ZW0pID0+IHRoaXMuaXNJdGVtVmlzaWJsZShwcm9jZXNzZWRJdGVtKSAmJiAhdGhpcy5nZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnc2VwYXJhdG9yJykpLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXRBcmlhUG9zSW5zZXQoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGluZGV4IC0gdGhpcy5pdGVtcy5zbGljZSgwLCBpbmRleCkuZmlsdGVyKChwcm9jZXNzZWRJdGVtKSA9PiB0aGlzLmlzSXRlbVZpc2libGUocHJvY2Vzc2VkSXRlbSkgJiYgdGhpcy5nZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnc2VwYXJhdG9yJykpLmxlbmd0aCArIDE7XG4gICAgfVxuXG4gICAgb25JdGVtQ2xpY2soZXZlbnQsIHByb2Nlc3NlZEl0ZW0pIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzSXRlbURpc2FibGVkKHByb2Nlc3NlZEl0ZW0pKSB7XG4gICAgICAgICAgICB0aGlzLmdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdjb21tYW5kJywgeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgaXRlbTogcHJvY2Vzc2VkSXRlbS5pdGVtIH0pO1xuICAgICAgICAgICAgdGhpcy5pdGVtVG9nZ2xlLmVtaXQoeyBwcm9jZXNzZWRJdGVtLCBleHBhbmRlZDogIXRoaXMuaXNJdGVtQWN0aXZlKHByb2Nlc3NlZEl0ZW0pIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JdGVtVG9nZ2xlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuaXRlbVRvZ2dsZS5lbWl0KGV2ZW50KTtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1wYW5lbE1lbnVMaXN0JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8cC1wYW5lbE1lbnVTdWJcbiAgICAgICAgICAgICNzdWJtZW51XG4gICAgICAgICAgICBbcm9vdF09XCJ0cnVlXCJcbiAgICAgICAgICAgIFtpZF09XCJwYW5lbElkICsgJ19saXN0J1wiXG4gICAgICAgICAgICBbcGFuZWxJZF09XCJwYW5lbElkXCJcbiAgICAgICAgICAgIFt0YWJpbmRleF09XCJ0YWJpbmRleFwiXG4gICAgICAgICAgICBbaXRlbVRlbXBsYXRlXT1cIml0ZW1UZW1wbGF0ZVwiXG4gICAgICAgICAgICBbZm9jdXNlZEl0ZW1JZF09XCJmb2N1c2VkID8gZm9jdXNlZEl0ZW1JZCA6IHVuZGVmaW5lZFwiXG4gICAgICAgICAgICBbYWN0aXZlSXRlbVBhdGhdPVwiYWN0aXZlSXRlbVBhdGgoKVwiXG4gICAgICAgICAgICBbdHJhbnNpdGlvbk9wdGlvbnNdPVwidHJhbnNpdGlvbk9wdGlvbnNcIlxuICAgICAgICAgICAgW2l0ZW1zXT1cInByb2Nlc3NlZEl0ZW1zKClcIlxuICAgICAgICAgICAgW3BhcmVudEV4cGFuZGVkXT1cInBhcmVudEV4cGFuZGVkXCJcbiAgICAgICAgICAgIChpdGVtVG9nZ2xlKT1cIm9uSXRlbVRvZ2dsZSgkZXZlbnQpXCJcbiAgICAgICAgICAgIChrZXlkb3duKT1cIm9uS2V5RG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgIChtZW51Rm9jdXMpPVwib25Gb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAgIChtZW51Qmx1cik9XCJvbkJsdXIoJGV2ZW50KVwiXG4gICAgICAgID48L3AtcGFuZWxNZW51U3ViPlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9wYW5lbG1lbnUuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFBhbmVsTWVudUxpc3QgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAgIEBJbnB1dCgpIHBhbmVsSWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBpdGVtczogYW55W107XG5cbiAgICBASW5wdXQoKSBpdGVtVGVtcGxhdGU6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgcGFyZW50RXhwYW5kZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBleHBhbmRlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIHRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSByb290OiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGFjdGl2ZUl0ZW06IGFueTtcblxuICAgIEBPdXRwdXQoKSBpdGVtVG9nZ2xlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQE91dHB1dCgpIGhlYWRlckZvY3VzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQFZpZXdDaGlsZCgnc3VibWVudScpIHN1Yk1lbnVWaWV3Q2hpbGQ6IFBhbmVsTWVudVN1YjtcblxuICAgIHNlYXJjaFRpbWVvdXQ6IGFueTtcblxuICAgIHNlYXJjaFZhbHVlOiBhbnk7XG5cbiAgICBmb2N1c2VkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgZm9jdXNlZEl0ZW0gPSBzaWduYWw8YW55PihudWxsKTtcblxuICAgIGFjdGl2ZUl0ZW1QYXRoID0gc2lnbmFsPGFueVtdPihbXSk7XG5cbiAgICBwcm9jZXNzZWRJdGVtcyA9IHNpZ25hbDxhbnlbXT4oW10pO1xuXG4gICAgdmlzaWJsZUl0ZW1zID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgICBjb25zdCBwcm9jZXNzZWRJdGVtcyA9IHRoaXMucHJvY2Vzc2VkSXRlbXMoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmxhdEl0ZW1zKHByb2Nlc3NlZEl0ZW1zKTtcbiAgICB9KTtcblxuICAgIGdldCBmb2N1c2VkSXRlbUlkKCkge1xuICAgICAgICBjb25zdCBmb2N1c2VkSXRlbSA9IHRoaXMuZm9jdXNlZEl0ZW0oKTtcbiAgICAgICAgcmV0dXJuIGZvY3VzZWRJdGVtICYmIGZvY3VzZWRJdGVtLml0ZW0/LmlkID8gZm9jdXNlZEl0ZW0uaXRlbS5pZCA6IE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5mb2N1c2VkSXRlbSgpKSA/IGAke3RoaXMucGFuZWxJZH1fJHt0aGlzLmZvY3VzZWRJdGVtKCkua2V5fWAgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge31cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXMgJiYgY2hhbmdlcy5pdGVtcyAmJiBjaGFuZ2VzLml0ZW1zLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzZWRJdGVtcy5zZXQodGhpcy5jcmVhdGVQcm9jZXNzZWRJdGVtcyhjaGFuZ2VzLml0ZW1zLmN1cnJlbnRWYWx1ZSB8fCBbXSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgbmFtZSkge1xuICAgICAgICByZXR1cm4gcHJvY2Vzc2VkSXRlbSAmJiBwcm9jZXNzZWRJdGVtLml0ZW0gPyBPYmplY3RVdGlscy5nZXRJdGVtVmFsdWUocHJvY2Vzc2VkSXRlbS5pdGVtW25hbWVdKSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXRJdGVtTGFiZWwocHJvY2Vzc2VkSXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnbGFiZWwnKTtcbiAgICB9XG5cbiAgICBpc0l0ZW1WaXNpYmxlKHByb2Nlc3NlZEl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3Zpc2libGUnKSAhPT0gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNJdGVtRGlzYWJsZWQocHJvY2Vzc2VkSXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnZGlzYWJsZWQnKTtcbiAgICB9XG5cbiAgICBpc0l0ZW1BY3RpdmUocHJvY2Vzc2VkSXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmVJdGVtUGF0aCgpLnNvbWUoKHBhdGgpID0+IHBhdGgua2V5ID09PSBwcm9jZXNzZWRJdGVtLnBhcmVudEtleSk7XG4gICAgfVxuXG4gICAgaXNJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0VXRpbHMuaXNOb3RFbXB0eShwcm9jZXNzZWRJdGVtLml0ZW1zKTtcbiAgICB9XG5cbiAgICBpc0VsZW1lbnRJblBhbmVsKGV2ZW50LCBlbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IHBhbmVsID0gZXZlbnQuY3VycmVudFRhcmdldC5jbG9zZXN0KCdbZGF0YS1wYy1zZWN0aW9uPVwicGFuZWxcIl0nKTtcblxuICAgICAgICByZXR1cm4gcGFuZWwgJiYgcGFuZWwuY29udGFpbnMoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgaXNJdGVtTWF0Y2hlZChwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWRJdGVtKHByb2Nlc3NlZEl0ZW0pICYmIHRoaXMuZ2V0SXRlbUxhYmVsKHByb2Nlc3NlZEl0ZW0pLnRvTG9jYWxlTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCh0aGlzLnNlYXJjaFZhbHVlLnRvTG9jYWxlTG93ZXJDYXNlKCkpO1xuICAgIH1cblxuICAgIGlzVmlzaWJsZUl0ZW0ocHJvY2Vzc2VkSXRlbSkge1xuICAgICAgICByZXR1cm4gISFwcm9jZXNzZWRJdGVtICYmIChwcm9jZXNzZWRJdGVtLmxldmVsID09PSAwIHx8IHRoaXMuaXNJdGVtQWN0aXZlKHByb2Nlc3NlZEl0ZW0pKSAmJiB0aGlzLmlzSXRlbVZpc2libGUocHJvY2Vzc2VkSXRlbSk7XG4gICAgfVxuXG4gICAgaXNWYWxpZEl0ZW0ocHJvY2Vzc2VkSXRlbSkge1xuICAgICAgICByZXR1cm4gISFwcm9jZXNzZWRJdGVtICYmICF0aGlzLmlzSXRlbURpc2FibGVkKHByb2Nlc3NlZEl0ZW0pICYmICFwcm9jZXNzZWRJdGVtLnNlcGFyYXRvcjtcbiAgICB9XG5cbiAgICBmaW5kRmlyc3RJdGVtKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpYmxlSXRlbXMoKS5maW5kKChwcm9jZXNzZWRJdGVtKSA9PiB0aGlzLmlzVmFsaWRJdGVtKHByb2Nlc3NlZEl0ZW0pKTtcbiAgICB9XG5cbiAgICBmaW5kTGFzdEl0ZW0oKSB7XG4gICAgICAgIHJldHVybiBPYmplY3RVdGlscy5maW5kTGFzdCh0aGlzLnZpc2libGVJdGVtcygpLCAocHJvY2Vzc2VkSXRlbSkgPT4gdGhpcy5pc1ZhbGlkSXRlbShwcm9jZXNzZWRJdGVtKSk7XG4gICAgfVxuXG4gICAgY3JlYXRlUHJvY2Vzc2VkSXRlbXMoaXRlbXMsIGxldmVsID0gMCwgcGFyZW50ID0ge30sIHBhcmVudEtleSA9ICcnKSB7XG4gICAgICAgIGNvbnN0IHByb2Nlc3NlZEl0ZW1zID0gW107XG4gICAgICAgIGl0ZW1zICYmXG4gICAgICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IChwYXJlbnRLZXkgIT09ICcnID8gcGFyZW50S2V5ICsgJ18nIDogJycpICsgaW5kZXg7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3SXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogaXRlbS5pY29uLFxuICAgICAgICAgICAgICAgICAgICBleHBhbmRlZDogaXRlbS5leHBhbmRlZCxcbiAgICAgICAgICAgICAgICAgICAgc2VwYXJhdG9yOiBpdGVtLnNlcGFyYXRvcixcbiAgICAgICAgICAgICAgICAgICAgaXRlbSxcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIGxldmVsLFxuICAgICAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudCxcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50S2V5XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIG5ld0l0ZW1bJ2l0ZW1zJ10gPSB0aGlzLmNyZWF0ZVByb2Nlc3NlZEl0ZW1zKGl0ZW0uaXRlbXMsIGxldmVsICsgMSwgbmV3SXRlbSwga2V5KTtcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWRJdGVtcy5wdXNoKG5ld0l0ZW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm9jZXNzZWRJdGVtcztcbiAgICB9XG5cbiAgICBmaW5kUHJvY2Vzc2VkSXRlbUJ5SXRlbUtleShrZXksIHByb2Nlc3NlZEl0ZW1zPywgbGV2ZWwgPSAwKSB7XG4gICAgICAgIHByb2Nlc3NlZEl0ZW1zID0gcHJvY2Vzc2VkSXRlbXMgfHwgdGhpcy5wcm9jZXNzZWRJdGVtcygpO1xuICAgICAgICBpZiAocHJvY2Vzc2VkSXRlbXMgJiYgcHJvY2Vzc2VkSXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2Nlc3NlZEl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkSXRlbSA9IHByb2Nlc3NlZEl0ZW1zW2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2tleScpID09PSBrZXkpIHJldHVybiBwcm9jZXNzZWRJdGVtO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoZWRJdGVtID0gdGhpcy5maW5kUHJvY2Vzc2VkSXRlbUJ5SXRlbUtleShrZXksIHByb2Nlc3NlZEl0ZW0uaXRlbXMsIGxldmVsICsgMSk7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoZWRJdGVtKSByZXR1cm4gbWF0Y2hlZEl0ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmbGF0SXRlbXMocHJvY2Vzc2VkSXRlbXMsIHByb2Nlc3NlZEZsYXR0ZW5JdGVtcyA9IFtdKSB7XG4gICAgICAgIHByb2Nlc3NlZEl0ZW1zICYmXG4gICAgICAgICAgICBwcm9jZXNzZWRJdGVtcy5mb3JFYWNoKChwcm9jZXNzZWRJdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlSXRlbShwcm9jZXNzZWRJdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzZWRGbGF0dGVuSXRlbXMucHVzaChwcm9jZXNzZWRJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mbGF0SXRlbXMocHJvY2Vzc2VkSXRlbS5pdGVtcywgcHJvY2Vzc2VkRmxhdHRlbkl0ZW1zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcHJvY2Vzc2VkRmxhdHRlbkl0ZW1zO1xuICAgIH1cblxuICAgIGNoYW5nZUZvY3VzZWRJdGVtKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHsgb3JpZ2luYWxFdmVudCwgcHJvY2Vzc2VkSXRlbSwgZm9jdXNPbk5leHQsIHNlbGZDaGVjaywgYWxsb3dIZWFkZXJGb2N1cyA9IHRydWUgfSA9IGV2ZW50O1xuXG4gICAgICAgIGlmIChPYmplY3RVdGlscy5pc05vdEVtcHR5KHRoaXMuZm9jdXNlZEl0ZW0oKSkgJiYgdGhpcy5mb2N1c2VkSXRlbSgpLmtleSAhPT0gcHJvY2Vzc2VkSXRlbS5rZXkpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZEl0ZW0uc2V0KHByb2Nlc3NlZEl0ZW0pO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxJblZpZXcoKTtcbiAgICAgICAgfSBlbHNlIGlmIChhbGxvd0hlYWRlckZvY3VzKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlckZvY3VzLmVtaXQoeyBvcmlnaW5hbEV2ZW50LCBmb2N1c09uTmV4dCwgc2VsZkNoZWNrIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2Nyb2xsSW5WaWV3KCkge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuc3ViTWVudVZpZXdDaGlsZC5saXN0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsIGBsaVtpZD1cIiR7YCR7dGhpcy5mb2N1c2VkSXRlbUlkfWB9XCJdYCk7XG5cbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcgJiYgZWxlbWVudC5zY3JvbGxJbnRvVmlldyh7IGJsb2NrOiAnbmVhcmVzdCcsIGlubGluZTogJ25lYXJlc3QnIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Gb2N1cyhldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuZm9jdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnN0IGZvY3VzZWRJdGVtID0gdGhpcy5mb2N1c2VkSXRlbSgpIHx8ICh0aGlzLmlzRWxlbWVudEluUGFuZWwoZXZlbnQsIGV2ZW50LnJlbGF0ZWRUYXJnZXQpID8gdGhpcy5maW5kRmlyc3RJdGVtKCkgOiB0aGlzLmZpbmRMYXN0SXRlbSgpKTtcbiAgICAgICAgICAgIGlmIChldmVudC5yZWxhdGVkVGFyZ2V0ICE9PSBudWxsKSB0aGlzLmZvY3VzZWRJdGVtLnNldChmb2N1c2VkSXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkJsdXIoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQucmVsYXRlZFRhcmdldDtcblxuICAgICAgICBpZiAodGhpcy5mb2N1c2VkICYmICF0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmZvY3VzZWRJdGVtLnNldChudWxsKTtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoVmFsdWUgPSAnJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSXRlbVRvZ2dsZShldmVudCkge1xuICAgICAgICBjb25zdCB7IHByb2Nlc3NlZEl0ZW0sIGV4cGFuZGVkIH0gPSBldmVudDtcbiAgICAgICAgcHJvY2Vzc2VkSXRlbS5leHBhbmRlZCA9ICFwcm9jZXNzZWRJdGVtLmV4cGFuZGVkO1xuXG4gICAgICAgIGNvbnN0IGFjdGl2ZUl0ZW1QYXRoID0gdGhpcy5hY3RpdmVJdGVtUGF0aCgpLmZpbHRlcigocCkgPT4gcC5wYXJlbnRLZXkgIT09IHByb2Nlc3NlZEl0ZW0ucGFyZW50S2V5KTtcbiAgICAgICAgZXhwYW5kZWQgJiYgYWN0aXZlSXRlbVBhdGgucHVzaChwcm9jZXNzZWRJdGVtKTtcblxuICAgICAgICB0aGlzLmFjdGl2ZUl0ZW1QYXRoLnNldChhY3RpdmVJdGVtUGF0aCk7XG4gICAgICAgIHRoaXMucHJvY2Vzc2VkSXRlbXMudXBkYXRlKCh2YWx1ZSkgPT4gdmFsdWUubWFwKChpKSA9PiAoaSA9PT0gcHJvY2Vzc2VkSXRlbSA/IHByb2Nlc3NlZEl0ZW0gOiBpKSkpO1xuICAgICAgICB0aGlzLmZvY3VzZWRJdGVtLnNldChwcm9jZXNzZWRJdGVtKTtcbiAgICB9XG5cbiAgICBvbktleURvd24oZXZlbnQpIHtcbiAgICAgICAgY29uc3QgbWV0YUtleSA9IGV2ZW50Lm1ldGFLZXkgfHwgZXZlbnQuY3RybEtleTtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkFycm93RG93bktleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd1VwS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dMZWZ0S2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkFycm93UmlnaHRLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdIb21lJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uSG9tZUtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0VuZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVuZEtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ1NwYWNlJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uU3BhY2VLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVudGVyS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnRXNjYXBlJzpcbiAgICAgICAgICAgIGNhc2UgJ1RhYic6XG4gICAgICAgICAgICBjYXNlICdQYWdlRG93bic6XG4gICAgICAgICAgICBjYXNlICdQYWdlVXAnOlxuICAgICAgICAgICAgY2FzZSAnQmFja3NwYWNlJzpcbiAgICAgICAgICAgIGNhc2UgJ1NoaWZ0TGVmdCc6XG4gICAgICAgICAgICBjYXNlICdTaGlmdFJpZ2h0JzpcbiAgICAgICAgICAgICAgICAvL05PT1BcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBpZiAoIW1ldGFLZXkgJiYgT2JqZWN0VXRpbHMuaXNQcmludGFibGVDaGFyYWN0ZXIoZXZlbnQua2V5KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaEl0ZW1zKGV2ZW50LCBldmVudC5rZXkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25BcnJvd0Rvd25LZXkoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgcHJvY2Vzc2VkSXRlbSA9IE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5mb2N1c2VkSXRlbSgpKSA/IHRoaXMuZmluZE5leHRJdGVtKHRoaXMuZm9jdXNlZEl0ZW0oKSkgOiB0aGlzLmZpbmRGaXJzdEl0ZW0oKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VGb2N1c2VkSXRlbSh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBwcm9jZXNzZWRJdGVtLCBmb2N1c09uTmV4dDogdHJ1ZSB9KTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgb25BcnJvd1VwS2V5KGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHByb2Nlc3NlZEl0ZW0gPSBPYmplY3RVdGlscy5pc05vdEVtcHR5KHRoaXMuZm9jdXNlZEl0ZW0oKSkgPyB0aGlzLmZpbmRQcmV2SXRlbSh0aGlzLmZvY3VzZWRJdGVtKCkpIDogdGhpcy5maW5kTGFzdEl0ZW0oKTtcblxuICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRJdGVtKHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIHByb2Nlc3NlZEl0ZW0sIHNlbGZDaGVjazogdHJ1ZSB9KTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkFycm93TGVmdEtleShldmVudCkge1xuICAgICAgICBpZiAoT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh0aGlzLmZvY3VzZWRJdGVtKCkpKSB7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVkID0gdGhpcy5hY3RpdmVJdGVtUGF0aCgpLnNvbWUoKHApID0+IHAua2V5ID09PSB0aGlzLmZvY3VzZWRJdGVtKCkua2V5KTtcblxuICAgICAgICAgICAgaWYgKG1hdGNoZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVJdGVtUGF0aCA9IHRoaXMuYWN0aXZlSXRlbVBhdGgoKS5maWx0ZXIoKHApID0+IHAua2V5ICE9PSB0aGlzLmZvY3VzZWRJdGVtKCkua2V5KTtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW1QYXRoLnNldChhY3RpdmVJdGVtUGF0aCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvY3VzZWRJdGVtID0gT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh0aGlzLmZvY3VzZWRJdGVtKCkucGFyZW50KSA/IHRoaXMuZm9jdXNlZEl0ZW0oKS5wYXJlbnQgOiB0aGlzLmZvY3VzZWRJdGVtKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c2VkSXRlbS5zZXQoZm9jdXNlZEl0ZW0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25BcnJvd1JpZ2h0S2V5KGV2ZW50KSB7XG4gICAgICAgIGlmIChPYmplY3RVdGlscy5pc05vdEVtcHR5KHRoaXMuZm9jdXNlZEl0ZW0oKSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwZWQgPSB0aGlzLmlzSXRlbUdyb3VwKHRoaXMuZm9jdXNlZEl0ZW0oKSk7XG5cbiAgICAgICAgICAgIGlmIChncm91cGVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hlZCA9IHRoaXMuYWN0aXZlSXRlbVBhdGgoKS5zb21lKChwKSA9PiBwLmtleSA9PT0gdGhpcy5mb2N1c2VkSXRlbSgpLmtleSk7XG5cbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dEb3duS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVJdGVtUGF0aCA9IHRoaXMuYWN0aXZlSXRlbVBhdGgoKS5maWx0ZXIoKHApID0+IHAucGFyZW50S2V5ICE9PSB0aGlzLmZvY3VzZWRJdGVtKCkucGFyZW50S2V5KTtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlSXRlbVBhdGgucHVzaCh0aGlzLmZvY3VzZWRJdGVtKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbVBhdGguc2V0KGFjdGl2ZUl0ZW1QYXRoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkhvbWVLZXkoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VGb2N1c2VkSXRlbSh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBwcm9jZXNzZWRJdGVtOiB0aGlzLmZpbmRGaXJzdEl0ZW0oKSwgYWxsb3dIZWFkZXJGb2N1czogZmFsc2UgfSk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25FbmRLZXkoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VGb2N1c2VkSXRlbSh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBwcm9jZXNzZWRJdGVtOiB0aGlzLmZpbmRMYXN0SXRlbSgpLCBmb2N1c09uTmV4dDogdHJ1ZSwgYWxsb3dIZWFkZXJGb2N1czogZmFsc2UgfSk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25FbnRlcktleShldmVudCkge1xuICAgICAgICBpZiAoT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh0aGlzLmZvY3VzZWRJdGVtKCkpKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuc3ViTWVudVZpZXdDaGlsZC5saXN0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsIGBsaVtpZD1cIiR7YCR7dGhpcy5mb2N1c2VkSXRlbUlkfWB9XCJdYCk7XG4gICAgICAgICAgICBjb25zdCBhbmNob3JFbGVtZW50ID0gZWxlbWVudCAmJiAoRG9tSGFuZGxlci5maW5kU2luZ2xlKGVsZW1lbnQsICdbZGF0YS1wYy1zZWN0aW9uPVwiYWN0aW9uXCJdJykgfHwgRG9tSGFuZGxlci5maW5kU2luZ2xlKGVsZW1lbnQsICdhLGJ1dHRvbicpKTtcblxuICAgICAgICAgICAgYW5jaG9yRWxlbWVudCA/IGFuY2hvckVsZW1lbnQuY2xpY2soKSA6IGVsZW1lbnQgJiYgZWxlbWVudC5jbGljaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblNwYWNlS2V5KGV2ZW50KSB7XG4gICAgICAgIHRoaXMub25FbnRlcktleShldmVudCk7XG4gICAgfVxuXG4gICAgZmluZE5leHRJdGVtKHByb2Nlc3NlZEl0ZW0pIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnZpc2libGVJdGVtcygpLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5rZXkgPT09IHByb2Nlc3NlZEl0ZW0ua2V5KTtcblxuICAgICAgICBjb25zdCBtYXRjaGVkSXRlbSA9XG4gICAgICAgICAgICBpbmRleCA8IHRoaXMudmlzaWJsZUl0ZW1zKCkubGVuZ3RoIC0gMVxuICAgICAgICAgICAgICAgID8gdGhpcy52aXNpYmxlSXRlbXMoKVxuICAgICAgICAgICAgICAgICAgICAgIC5zbGljZShpbmRleCArIDEpXG4gICAgICAgICAgICAgICAgICAgICAgLmZpbmQoKHBJdGVtKSA9PiB0aGlzLmlzVmFsaWRJdGVtKHBJdGVtKSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIG1hdGNoZWRJdGVtIHx8IHByb2Nlc3NlZEl0ZW07XG4gICAgfVxuXG4gICAgZmluZFByZXZJdGVtKHByb2Nlc3NlZEl0ZW0pIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnZpc2libGVJdGVtcygpLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5rZXkgPT09IHByb2Nlc3NlZEl0ZW0ua2V5KTtcbiAgICAgICAgY29uc3QgbWF0Y2hlZEl0ZW0gPSBpbmRleCA+IDAgPyBPYmplY3RVdGlscy5maW5kTGFzdCh0aGlzLnZpc2libGVJdGVtcygpLnNsaWNlKDAsIGluZGV4KSwgKHBJdGVtKSA9PiB0aGlzLmlzVmFsaWRJdGVtKHBJdGVtKSkgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgcmV0dXJuIG1hdGNoZWRJdGVtIHx8IHByb2Nlc3NlZEl0ZW07XG4gICAgfVxuXG4gICAgc2VhcmNoSXRlbXMoZXZlbnQsIGNoYXIpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hWYWx1ZSA9ICh0aGlzLnNlYXJjaFZhbHVlIHx8ICcnKSArIGNoYXI7XG5cbiAgICAgICAgbGV0IG1hdGNoZWRJdGVtID0gbnVsbDtcbiAgICAgICAgbGV0IG1hdGNoZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh0aGlzLmZvY3VzZWRJdGVtKCkpKSB7XG4gICAgICAgICAgICBjb25zdCBmb2N1c2VkSXRlbUluZGV4ID0gdGhpcy52aXNpYmxlSXRlbXMoKS5maW5kSW5kZXgoKHByb2Nlc3NlZEl0ZW0pID0+IHByb2Nlc3NlZEl0ZW0ua2V5ID09PSB0aGlzLmZvY3VzZWRJdGVtKCkua2V5KTtcblxuICAgICAgICAgICAgbWF0Y2hlZEl0ZW0gPSB0aGlzLnZpc2libGVJdGVtcygpXG4gICAgICAgICAgICAgICAgLnNsaWNlKGZvY3VzZWRJdGVtSW5kZXgpXG4gICAgICAgICAgICAgICAgLmZpbmQoKHByb2Nlc3NlZEl0ZW0pID0+IHRoaXMuaXNJdGVtTWF0Y2hlZChwcm9jZXNzZWRJdGVtKSk7XG4gICAgICAgICAgICBtYXRjaGVkSXRlbSA9IE9iamVjdFV0aWxzLmlzRW1wdHkobWF0Y2hlZEl0ZW0pXG4gICAgICAgICAgICAgICAgPyB0aGlzLnZpc2libGVJdGVtcygpXG4gICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDAsIGZvY3VzZWRJdGVtSW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgLmZpbmQoKHByb2Nlc3NlZEl0ZW0pID0+IHRoaXMuaXNJdGVtTWF0Y2hlZChwcm9jZXNzZWRJdGVtKSlcbiAgICAgICAgICAgICAgICA6IG1hdGNoZWRJdGVtO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWF0Y2hlZEl0ZW0gPSB0aGlzLnZpc2libGVJdGVtcygpLmZpbmQoKHByb2Nlc3NlZEl0ZW0pID0+IHRoaXMuaXNJdGVtTWF0Y2hlZChwcm9jZXNzZWRJdGVtKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoT2JqZWN0VXRpbHMuaXNOb3RFbXB0eShtYXRjaGVkSXRlbSkpIHtcbiAgICAgICAgICAgIG1hdGNoZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE9iamVjdFV0aWxzLmlzRW1wdHkobWF0Y2hlZEl0ZW0pICYmIE9iamVjdFV0aWxzLmlzRW1wdHkodGhpcy5mb2N1c2VkSXRlbSgpKSkge1xuICAgICAgICAgICAgbWF0Y2hlZEl0ZW0gPSB0aGlzLmZpbmRGaXJzdEl0ZW0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChPYmplY3RVdGlscy5pc05vdEVtcHR5KG1hdGNoZWRJdGVtKSkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VGb2N1c2VkSXRlbSh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VkSXRlbTogbWF0Y2hlZEl0ZW0sXG4gICAgICAgICAgICAgICAgYWxsb3dIZWFkZXJGb2N1czogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoVGltZW91dCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuc2VhcmNoVGltZW91dCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlYXJjaFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoVmFsdWUgPSAnJztcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoVGltZW91dCA9IG51bGw7XG4gICAgICAgIH0sIDUwMCk7XG5cbiAgICAgICAgcmV0dXJuIG1hdGNoZWQ7XG4gICAgfVxufVxuXG4vKipcbiAqIFBhbmVsTWVudSBpcyBhIGh5YnJpZCBvZiBBY2NvcmRpb24gYW5kIFRyZWUgY29tcG9uZW50cy5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1wYW5lbE1lbnUnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtuZ0NsYXNzXT1cIidwLXBhbmVsbWVudSBwLWNvbXBvbmVudCdcIiAjY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaXRlbSBvZiBtb2RlbDsgbGV0IGYgPSBmaXJzdDsgbGV0IGwgPSBsYXN0OyBsZXQgaSA9IGluZGV4XCI+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImlzSXRlbVZpc2libGUoaXRlbSlcIiBjbGFzcz1cInAtcGFuZWxtZW51LXBhbmVsXCIgW25nQ2xhc3NdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ2hlYWRlckNsYXNzJylcIiBbbmdTdHlsZV09XCJnZXRJdGVtUHJvcChpdGVtLCAnc3R5bGUnKVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCIncGFuZWwnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtY29tcG9uZW50IHAtcGFuZWxtZW51LWhlYWRlcic6IHRydWUsICdwLWhpZ2hsaWdodCc6IGlzSXRlbUFjdGl2ZShpdGVtKSwgJ3AtZGlzYWJsZWQnOiBpc0l0ZW1EaXNhYmxlZChpdGVtKSB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzc109XCJnZXRJdGVtUHJvcChpdGVtLCAnc3R5bGVDbGFzcycpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cImdldEl0ZW1Qcm9wKGl0ZW0sICdzdHlsZScpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtwVG9vbHRpcF09XCJnZXRJdGVtUHJvcChpdGVtLCAndG9vbHRpcCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cImdldEhlYWRlcklkKGl0ZW0sIGkpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0YWJpbmRleF09XCIwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBPcHRpb25zXT1cImdldEl0ZW1Qcm9wKGl0ZW0sICd0b29sdGlwT3B0aW9ucycpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiaXNJdGVtQWN0aXZlKGl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ2xhYmVsJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1jb250cm9sc109XCJnZXRDb250ZW50SWQoaXRlbSwgaSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1kaXNhYmxlZF09XCJpc0l0ZW1EaXNhYmxlZChpdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXAtaGlnaGxpZ2h0XT1cImlzSXRlbUFjdGl2ZShpdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXAtZGlzYWJsZWRdPVwiaXNJdGVtRGlzYWJsZWQoaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidoZWFkZXInXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkhlYWRlckNsaWNrKCRldmVudCwgaXRlbSwgaSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25IZWFkZXJLZXlEb3duKCRldmVudCwgaXRlbSwgaSlcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1wYW5lbG1lbnUtaGVhZGVyLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cIiFnZXRJdGVtUHJvcChpdGVtLCAncm91dGVyTGluaycpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuaHJlZl09XCJnZXRJdGVtUHJvcChpdGVtLCAndXJsJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCItMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0YXJnZXRdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ3RhcmdldCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGl0bGVdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ3RpdGxlJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtcGFuZWxtZW51LWhlYWRlci1hY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2hlYWRlcmFjdGlvbidcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzSXRlbUdyb3VwKGl0ZW0pXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXN1Ym1lbnVJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hldnJvbkRvd25JY29uIFtzdHlsZUNsYXNzXT1cIidwLXN1Ym1lbnUtaWNvbidcIiAqbmdJZj1cImlzSXRlbUFjdGl2ZShpdGVtKVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPENoZXZyb25SaWdodEljb24gW3N0eWxlQ2xhc3NdPVwiJ3Atc3VibWVudS1pY29uJ1wiICpuZ0lmPVwiIWlzSXRlbUFjdGl2ZShpdGVtKVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cInN1Ym1lbnVJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLWljb25cIiBbbmdDbGFzc109XCJpdGVtLmljb25cIiAqbmdJZj1cIml0ZW0uaWNvblwiIFtuZ1N0eWxlXT1cImdldEl0ZW1Qcm9wKGl0ZW0sICdpY29uU3R5bGUnKVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiAqbmdJZj1cImdldEl0ZW1Qcm9wKGl0ZW0sICdlc2NhcGUnKSAhPT0gZmFsc2U7IGVsc2UgaHRtbExhYmVsXCI+e3sgZ2V0SXRlbVByb3AoaXRlbSwgJ2xhYmVsJykgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjaHRtbExhYmVsPjxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCIgW2lubmVySFRNTF09XCJnZXRJdGVtUHJvcChpdGVtLCAnbGFiZWwnKVwiPjwvc3Bhbj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tYmFkZ2VcIiAqbmdJZj1cImdldEl0ZW1Qcm9wKGl0ZW0sICdiYWRnZScpXCIgW25nQ2xhc3NdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ2JhZGdlU3R5bGVDbGFzcycpXCI+e3sgZ2V0SXRlbVByb3AoaXRlbSwgJ2JhZGdlJykgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ3JvdXRlckxpbmsnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyb3V0ZXJMaW5rXT1cImdldEl0ZW1Qcm9wKGl0ZW0sICdyb3V0ZXJMaW5rJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcXVlcnlQYXJhbXNdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ3F1ZXJ5UGFyYW1zJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcm91dGVyTGlua0FjdGl2ZV09XCIncC1tZW51aXRlbS1saW5rLWFjdGl2ZSdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcm91dGVyTGlua0FjdGl2ZU9wdGlvbnNdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ3JvdXRlckxpbmtBY3RpdmVPcHRpb25zJykgfHwgeyBleGFjdDogZmFsc2UgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0YXJnZXRdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ3RhcmdldCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLXBhbmVsbWVudS1oZWFkZXItYWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiLTFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZnJhZ21lbnRdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ2ZyYWdtZW50JylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcXVlcnlQYXJhbXNIYW5kbGluZ109XCJnZXRJdGVtUHJvcChpdGVtLCAncXVlcnlQYXJhbXNIYW5kbGluZycpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3ByZXNlcnZlRnJhZ21lbnRdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ3ByZXNlcnZlRnJhZ21lbnQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtza2lwTG9jYXRpb25DaGFuZ2VdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ3NraXBMb2NhdGlvbkNoYW5nZScpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3JlcGxhY2VVcmxdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ3JlcGxhY2VVcmwnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdGF0ZV09XCJnZXRJdGVtUHJvcChpdGVtLCAnc3RhdGUnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaGVhZGVyYWN0aW9uJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNJdGVtR3JvdXAoaXRlbSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhc3VibWVudUljb25UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGV2cm9uRG93bkljb24gW3N0eWxlQ2xhc3NdPVwiJ3Atc3VibWVudS1pY29uJ1wiICpuZ0lmPVwiaXNJdGVtQWN0aXZlKGl0ZW0pXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hldnJvblJpZ2h0SWNvbiBbc3R5bGVDbGFzc109XCIncC1zdWJtZW51LWljb24nXCIgKm5nSWY9XCIhaXNJdGVtQWN0aXZlKGl0ZW0pXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwic3VibWVudUljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0taWNvblwiIFtuZ0NsYXNzXT1cIml0ZW0uaWNvblwiICpuZ0lmPVwiaXRlbS5pY29uXCIgW25nU3R5bGVdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ2ljb25TdHlsZScpXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tdGV4dFwiICpuZ0lmPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ2VzY2FwZScpICE9PSBmYWxzZTsgZWxzZSBodG1sUm91dGVMYWJlbFwiPnt7IGdldEl0ZW1Qcm9wKGl0ZW0sICdsYWJlbCcpIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2h0bWxSb3V0ZUxhYmVsPjxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCIgW2lubmVySFRNTF09XCJnZXRJdGVtUHJvcChpdGVtLCAnbGFiZWwnKVwiPjwvc3Bhbj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tYmFkZ2VcIiAqbmdJZj1cImdldEl0ZW1Qcm9wKGl0ZW0sICdiYWRnZScpXCIgW25nQ2xhc3NdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ2JhZGdlU3R5bGVDbGFzcycpXCI+e3sgZ2V0SXRlbVByb3AoaXRlbSwgJ2JhZGdlJykgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImlzSXRlbUdyb3VwKGl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC10b2dnbGVhYmxlLWNvbnRlbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1wYW5lbG1lbnUtZXhwYW5kZWQnOiBpc0l0ZW1BY3RpdmUoaXRlbSkgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbQHJvb3RJdGVtXT1cImdldEFuaW1hdGlvbihpdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoQHJvb3RJdGVtLmRvbmUpPVwib25Ub2dnbGVEb25lKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cInJlZ2lvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5pZF09XCJnZXRDb250ZW50SWQoaXRlbSwgaSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImdldEhlYWRlcklkKGl0ZW0sIGkpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCIndG9nZ2xlYWJsZWNvbnRlbnQnXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGFuZWxtZW51LWNvbnRlbnRcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ21lbnVjb250ZW50J1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwLXBhbmVsTWVudUxpc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3BhbmVsSWRdPVwiZ2V0UGFuZWxJZChpLCBpdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpdGVtc109XCJnZXRJdGVtcyhpdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpdGVtVGVtcGxhdGVdPVwiaXRlbVRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RyYW5zaXRpb25PcHRpb25zXT1cInRyYW5zaXRpb25PcHRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Jvb3RdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthY3RpdmVJdGVtXT1cImFjdGl2ZUl0ZW0oKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0YWJpbmRleF09XCJ0YWJpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwYXJlbnRFeHBhbmRlZF09XCJpc0l0ZW1BY3RpdmUoaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaGVhZGVyRm9jdXMpPVwidXBkYXRlRm9jdXNlZEhlYWRlcigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+PC9wLXBhbmVsTWVudUxpc3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ3Jvb3RJdGVtJywgW1xuICAgICAgICAgICAgc3RhdGUoXG4gICAgICAgICAgICAgICAgJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcwJ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgc3RhdGUoXG4gICAgICAgICAgICAgICAgJ3Zpc2libGUnLFxuICAgICAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnKidcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGUgPD0+IGhpZGRlbicsIFthbmltYXRlKCd7e3RyYW5zaXRpb25QYXJhbXN9fScpXSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBhbmltYXRlKDApKVxuICAgICAgICBdKVxuICAgIF0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9wYW5lbG1lbnUuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFBhbmVsTWVudSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIG1lbnVpdGVtcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBtb2RlbDogTWVudUl0ZW1bXSB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIG11bHRpcGxlIHRhYnMgY2FuIGJlIGFjdGl2YXRlZCBhdCB0aGUgc2FtZSB0aW1lIG9yIG5vdC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBtdWx0aXBsZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFRyYW5zaXRpb24gb3B0aW9ucyBvZiB0aGUgYW5pbWF0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnNDAwbXMgY3ViaWMtYmV6aWVyKDAuODYsIDAsIDAuMDcsIDEpJztcbiAgICAvKipcbiAgICAgKiBDdXJyZW50IGlkIHN0YXRlIGFzIGEgc3RyaW5nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5kZXggb2YgdGhlIGVsZW1lbnQgaW4gdGFiYmluZyBvcmRlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkID0gMDtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4gfCB1bmRlZmluZWQ7XG5cbiAgICBAVmlld0NoaWxkKCdjb250YWluZXInKSBjb250YWluZXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWYgfCB1bmRlZmluZWQ7XG5cbiAgICBzdWJtZW51SWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgcHVibGljIGFuaW1hdGluZzogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIGFjdGl2ZUl0ZW0gPSBzaWduYWw8YW55PihudWxsKTtcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmlkID0gdGhpcy5pZCB8fCBVbmlxdWVDb21wb25lbnRJZCgpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXM/LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdzdWJtZW51aWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3VibWVudUljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2l0ZW0nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gICAgLyoqXG4gICAgICogQ29sbGFwc2VzIG9wZW4gcGFuZWxzLlxuICAgICAqIEBncm91cCBNZXRob2RcbiAgICAgKi9cbiAgICBjb2xsYXBzZUFsbCgpIHtcbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aGlzLm1vZGVsISkge1xuICAgICAgICAgICAgaWYgKGl0ZW0uZXhwYW5kZWQpIHtcbiAgICAgICAgICAgICAgICBpdGVtLmV4cGFuZGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBvblRvZ2dsZURvbmUoKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgY2hhbmdlQWN0aXZlSXRlbShldmVudCwgaXRlbSwgaW5kZXg/OiBudW1iZXIsIHNlbGZBY3RpdmUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNJdGVtRGlzYWJsZWQoaXRlbSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUl0ZW0gPSBzZWxmQWN0aXZlID8gaXRlbSA6IHRoaXMuYWN0aXZlSXRlbSAmJiBPYmplY3RVdGlscy5lcXVhbHMoaXRlbSwgdGhpcy5hY3RpdmVJdGVtKSA/IG51bGwgOiBpdGVtO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtLnNldChhY3RpdmVJdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEFuaW1hdGlvbihpdGVtOiBNZW51SXRlbSkge1xuICAgICAgICByZXR1cm4gaXRlbS5leHBhbmRlZCA/IHsgdmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7IHRyYW5zaXRpb25QYXJhbXM6IHRoaXMuYW5pbWF0aW5nID8gdGhpcy50cmFuc2l0aW9uT3B0aW9ucyA6ICcwbXMnLCBoZWlnaHQ6ICcqJyB9IH0gOiB7IHZhbHVlOiAnaGlkZGVuJywgcGFyYW1zOiB7IHRyYW5zaXRpb25QYXJhbXM6IHRoaXMudHJhbnNpdGlvbk9wdGlvbnMsIGhlaWdodDogJzAnIH0gfTtcbiAgICB9XG5cbiAgICBnZXRJdGVtUHJvcChpdGVtLCBuYW1lKSB7XG4gICAgICAgIHJldHVybiBpdGVtID8gT2JqZWN0VXRpbHMuZ2V0SXRlbVZhbHVlKGl0ZW1bbmFtZV0pIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldEl0ZW1zKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0gPyBbLi4uT2JqZWN0VXRpbHMuZ2V0SXRlbVZhbHVlKGl0ZW1bJ2l0ZW1zJ10pXSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXRJdGVtTGFiZWwoaXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtUHJvcChpdGVtLCAnbGFiZWwnKTtcbiAgICB9XG5cbiAgICBpc0l0ZW1BY3RpdmUoaXRlbSkge1xuICAgICAgICByZXR1cm4gaXRlbS5leHBhbmRlZDtcbiAgICB9XG5cbiAgICBpc0l0ZW1WaXNpYmxlKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbVByb3AoaXRlbSwgJ3Zpc2libGUnKSAhPT0gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNJdGVtRGlzYWJsZWQoaXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtUHJvcChpdGVtLCAnZGlzYWJsZWQnKTtcbiAgICB9XG5cbiAgICBpc0l0ZW1Hcm91cChpdGVtKSB7XG4gICAgICAgIHJldHVybiBPYmplY3RVdGlscy5pc05vdEVtcHR5KGl0ZW0uaXRlbXMpO1xuICAgIH1cblxuICAgIGdldFBhbmVsSWQoaW5kZXgsIGl0ZW0/KSB7XG4gICAgICAgIHJldHVybiBpdGVtICYmIGl0ZW0uaWQgPyBpdGVtLmlkIDogYCR7dGhpcy5pZH1fJHtpbmRleH1gO1xuICAgIH1cblxuICAgIGdldEhlYWRlcklkKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBpdGVtLmlkID8gaXRlbS5pZCArICdfaGVhZGVyJyA6IGAke3RoaXMuZ2V0UGFuZWxJZChpbmRleCl9X2hlYWRlcmA7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudElkKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBpdGVtLmlkID8gaXRlbS5pZCArICdfY29udGVudCcgOiBgJHt0aGlzLmdldFBhbmVsSWQoaW5kZXgpfV9jb250ZW50YDtcbiAgICB9XG5cbiAgICB1cGRhdGVGb2N1c2VkSGVhZGVyKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHsgb3JpZ2luYWxFdmVudCwgZm9jdXNPbk5leHQsIHNlbGZDaGVjayB9ID0gZXZlbnQ7XG4gICAgICAgIGNvbnN0IHBhbmVsRWxlbWVudCA9IG9yaWdpbmFsRXZlbnQuY3VycmVudFRhcmdldC5jbG9zZXN0KCdbZGF0YS1wYy1zZWN0aW9uPVwicGFuZWxcIl0nKTtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gc2VsZkNoZWNrID8gRG9tSGFuZGxlci5maW5kU2luZ2xlKHBhbmVsRWxlbWVudCwgJ1tkYXRhLXBjLXNlY3Rpb249XCJoZWFkZXJcIl0nKSA6IGZvY3VzT25OZXh0ID8gdGhpcy5maW5kTmV4dEhlYWRlcihwYW5lbEVsZW1lbnQpIDogdGhpcy5maW5kUHJldkhlYWRlcihwYW5lbEVsZW1lbnQpO1xuXG4gICAgICAgIGhlYWRlciA/IHRoaXMuY2hhbmdlRm9jdXNlZEhlYWRlcihvcmlnaW5hbEV2ZW50LCBoZWFkZXIpIDogZm9jdXNPbk5leHQgPyB0aGlzLm9uSGVhZGVySG9tZUtleShvcmlnaW5hbEV2ZW50KSA6IHRoaXMub25IZWFkZXJFbmRLZXkob3JpZ2luYWxFdmVudCk7XG4gICAgfVxuXG4gICAgY2hhbmdlRm9jdXNlZEhlYWRlcihldmVudCwgZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50ICYmIERvbUhhbmRsZXIuZm9jdXMoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgZmluZE5leHRIZWFkZXIocGFuZWxFbGVtZW50LCBzZWxmQ2hlY2sgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBuZXh0UGFuZWxFbGVtZW50ID0gc2VsZkNoZWNrID8gcGFuZWxFbGVtZW50IDogcGFuZWxFbGVtZW50Lm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgY29uc3QgaGVhZGVyRWxlbWVudCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZShuZXh0UGFuZWxFbGVtZW50LCAnW2RhdGEtcGMtc2VjdGlvbj1cImhlYWRlclwiXScpO1xuXG4gICAgICAgIHJldHVybiBoZWFkZXJFbGVtZW50ID8gKERvbUhhbmRsZXIuZ2V0QXR0cmlidXRlKGhlYWRlckVsZW1lbnQsICdkYXRhLXAtZGlzYWJsZWQnKSA/IHRoaXMuZmluZE5leHRIZWFkZXIoaGVhZGVyRWxlbWVudC5wYXJlbnRFbGVtZW50KSA6IGhlYWRlckVsZW1lbnQpIDogbnVsbDtcbiAgICB9XG5cbiAgICBmaW5kUHJldkhlYWRlcihwYW5lbEVsZW1lbnQsIHNlbGZDaGVjayA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IHByZXZQYW5lbEVsZW1lbnQgPSBzZWxmQ2hlY2sgPyBwYW5lbEVsZW1lbnQgOiBwYW5lbEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgY29uc3QgaGVhZGVyRWxlbWVudCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZShwcmV2UGFuZWxFbGVtZW50LCAnW2RhdGEtcGMtc2VjdGlvbj1cImhlYWRlclwiXScpO1xuXG4gICAgICAgIHJldHVybiBoZWFkZXJFbGVtZW50ID8gKERvbUhhbmRsZXIuZ2V0QXR0cmlidXRlKGhlYWRlckVsZW1lbnQsICdkYXRhLXAtZGlzYWJsZWQnKSA/IHRoaXMuZmluZFByZXZIZWFkZXIoaGVhZGVyRWxlbWVudC5wYXJlbnRFbGVtZW50KSA6IGhlYWRlckVsZW1lbnQpIDogbnVsbDtcbiAgICB9XG5cbiAgICBmaW5kRmlyc3RIZWFkZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmROZXh0SGVhZGVyKHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQsIHRydWUpO1xuICAgIH1cblxuICAgIGZpbmRMYXN0SGVhZGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5maW5kUHJldkhlYWRlcih0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQsIHRydWUpO1xuICAgIH1cblxuICAgIG9uSGVhZGVyQ2xpY2soZXZlbnQsIGl0ZW0sIGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLmlzSXRlbURpc2FibGVkKGl0ZW0pKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbS5jb21tYW5kKSB7XG4gICAgICAgICAgICBpdGVtLmNvbW1hbmQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgaXRlbSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgZm9yIChsZXQgbW9kZWxJdGVtIG9mIHRoaXMubW9kZWwhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0gIT09IG1vZGVsSXRlbSAmJiBtb2RlbEl0ZW0uZXhwYW5kZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxJdGVtLmV4cGFuZGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaXRlbS5leHBhbmRlZCA9ICFpdGVtLmV4cGFuZGVkO1xuICAgICAgICB0aGlzLmNoYW5nZUFjdGl2ZUl0ZW0oZXZlbnQsIGl0ZW0sIGluZGV4KTtcbiAgICAgICAgdGhpcy5hbmltYXRpbmcgPSB0cnVlO1xuICAgICAgICBEb21IYW5kbGVyLmZvY3VzKGV2ZW50LmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQpO1xuICAgIH1cblxuICAgIG9uSGVhZGVyS2V5RG93bihldmVudCwgaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMub25IZWFkZXJBcnJvd0Rvd25LZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uSGVhZGVyQXJyb3dVcEtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgICAgICAgICAgIHRoaXMub25IZWFkZXJIb21lS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnRW5kJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uSGVhZGVyRW5kS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgY2FzZSAnU3BhY2UnOlxuICAgICAgICAgICAgICAgIHRoaXMub25IZWFkZXJFbnRlcktleShldmVudCwgaXRlbSwgaW5kZXgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25IZWFkZXJBcnJvd0Rvd25LZXkoZXZlbnQpIHtcbiAgICAgICAgY29uc3Qgcm9vdExpc3QgPSBEb21IYW5kbGVyLmdldEF0dHJpYnV0ZShldmVudC5jdXJyZW50VGFyZ2V0LCAnZGF0YS1wLWhpZ2hsaWdodCcpID09PSB0cnVlID8gRG9tSGFuZGxlci5maW5kU2luZ2xlKGV2ZW50LmN1cnJlbnRUYXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLCAnW2RhdGEtcGMtc2VjdGlvbj1cIm1lbnVcIl0nKSA6IG51bGw7XG5cbiAgICAgICAgcm9vdExpc3QgPyBEb21IYW5kbGVyLmZvY3VzKHJvb3RMaXN0KSA6IHRoaXMudXBkYXRlRm9jdXNlZEhlYWRlcih7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBmb2N1c09uTmV4dDogdHJ1ZSB9KTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkhlYWRlckFycm93VXBLZXkoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgcHJldkhlYWRlciA9IHRoaXMuZmluZFByZXZIZWFkZXIoZXZlbnQuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50KSB8fCB0aGlzLmZpbmRMYXN0SGVhZGVyKCk7XG4gICAgICAgIGNvbnN0IHJvb3RMaXN0ID0gRG9tSGFuZGxlci5nZXRBdHRyaWJ1dGUocHJldkhlYWRlciwgJ2RhdGEtcC1oaWdobGlnaHQnKSA9PT0gdHJ1ZSA/IERvbUhhbmRsZXIuZmluZFNpbmdsZShwcmV2SGVhZGVyLm5leHRFbGVtZW50U2libGluZywgJ1tkYXRhLXBjLXNlY3Rpb249XCJtZW51XCJdJykgOiBudWxsO1xuXG4gICAgICAgIHJvb3RMaXN0ID8gRG9tSGFuZGxlci5mb2N1cyhyb290TGlzdCkgOiB0aGlzLnVwZGF0ZUZvY3VzZWRIZWFkZXIoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgZm9jdXNPbk5leHQ6IGZhbHNlIH0pO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uSGVhZGVySG9tZUtleShldmVudCkge1xuICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRIZWFkZXIoZXZlbnQsIHRoaXMuZmluZEZpcnN0SGVhZGVyKCkpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uSGVhZGVyRW5kS2V5KGV2ZW50KSB7XG4gICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZEhlYWRlcihldmVudCwgdGhpcy5maW5kTGFzdEhlYWRlcigpKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkhlYWRlckVudGVyS2V5KGV2ZW50LCBpdGVtLCBpbmRleCkge1xuICAgICAgICBjb25zdCBoZWFkZXJBY3Rpb24gPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUoZXZlbnQuY3VycmVudFRhcmdldCwgJ1tkYXRhLXBjLXNlY3Rpb249XCJoZWFkZXJhY3Rpb25cIl0nKTtcblxuICAgICAgICBoZWFkZXJBY3Rpb24gPyBoZWFkZXJBY3Rpb24uY2xpY2soKSA6IHRoaXMub25IZWFkZXJDbGljayhldmVudCwgaXRlbSwgaW5kZXgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbn1cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUm91dGVyTW9kdWxlLCBUb29sdGlwTW9kdWxlLCBTaGFyZWRNb2R1bGUsIEFuZ2xlRG93bkljb24sIEFuZ2xlUmlnaHRJY29uLCBDaGV2cm9uRG93bkljb24sIENoZXZyb25SaWdodEljb25dLFxuICAgIGV4cG9ydHM6IFtQYW5lbE1lbnUsIFJvdXRlck1vZHVsZSwgVG9vbHRpcE1vZHVsZSwgU2hhcmVkTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtQYW5lbE1lbnUsIFBhbmVsTWVudVN1YiwgUGFuZWxNZW51TGlzdF1cbn0pXG5leHBvcnQgY2xhc3MgUGFuZWxNZW51TW9kdWxlIHt9XG4iXX0=