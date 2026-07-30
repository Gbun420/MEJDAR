<?php

declare(strict_types=1);

namespace Mejdar\Core\Classes;

use Illuminate\Support\Facades\File;

class RoleManager
{
    /**
     * MEJDAR role definitions with least-privilege permissions.
     */
    protected array $roles = [
        'owner' => [
            'label' => 'Owner',
            'description' => 'Full access to all features',
            'permissions' => [
                'admin',
                'manage_settings',
                'manage_users',
                'manage_locations',
                'manage_menus',
                'manage_orders',
                'manage_reservations',
                'manage_payments',
                'manage_reports',
                'manage_customers',
                'manage_coupons',
                'manage_pages',
                'manage_automation',
                'manage_api',
            ],
        ],
        'manager' => [
            'label' => 'Manager',
            'description' => 'Can manage daily operations',
            'permissions' => [
                'manage_locations',
                'manage_menus',
                'manage_orders',
                'manage_reservations',
                'manage_payments',
                'manage_reports',
                'manage_customers',
                'manage_coupons',
            ],
        ],
        'order_staff' => [
            'label' => 'Order Staff',
            'description' => 'Can manage orders only',
            'permissions' => [
                'manage_orders',
            ],
        ],
        'reservation_staff' => [
            'label' => 'Reservation Staff',
            'description' => 'Can manage reservations only',
            'permissions' => [
                'manage_reservations',
            ],
        ],
        'analyst' => [
            'label' => 'Analyst',
            'description' => 'Read-only access to reports and data',
            'permissions' => [
                'manage_reports',
            ],
        ],
        'support_technician' => [
            'label' => 'Support Technician',
            'description' => 'Can view system status and logs',
            'permissions' => [
                'manage_settings',
            ],
        ],
    ];

    /**
     * Get all role definitions.
     */
    public function getRoles(): array
    {
        return $this->roles;
    }

    /**
     * Get permissions for a specific role.
     */
    public function getPermissions(string $role): array
    {
        return $this->roles[$role]['permissions'] ?? [];
    }

    /**
     * Check if a role has a specific permission.
     */
    public function hasPermission(string $role, string $permission): bool
    {
        $permissions = $this->getPermissions($role);
        return in_array($permission, $permissions) || in_array('admin', $permissions);
    }

    /**
     * Export roles to a JSON file for reference.
     */
    public function exportRoles(string $path): void
    {
        $json = json_encode($this->roles, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        File::put($path, $json);
    }

    /**
     * Validate that each role has only required permissions.
     * Returns array of issues found.
     */
    public function validateLeastPrivilege(): array
    {
        $issues = [];

        // Owner should have all permissions (expected)
        $ownerPerms = $this->getPermissions('owner');
        $allPerms = $this->getAllPermissions();
        $missingForOwner = array_diff($allPerms, $ownerPerms);
        if (!empty($missingForOwner)) {
            $issues[] = 'Owner missing permissions: ' . implode(', ', $missingForOwner);
        }

        // Other roles should NOT have admin
        $nonOwnerRoles = array_diff(array_keys($this->roles), ['owner']);
        foreach ($nonOwnerRoles as $role) {
            if ($this->hasPermission($role, 'admin')) {
                $issues[] = "{$role} should not have admin permission";
            }
        }

        // Order Staff should only have order-related permissions
        $orderStaffPerms = $this->getPermissions('order_staff');
        if (count($orderStaffPerms) > 1 || !in_array('manage_orders', $orderStaffPerms)) {
            $issues[] = 'Order Staff should only have manage_orders permission';
        }

        // Reservation Staff should only have reservation-related permissions
        $reservationStaffPerms = $this->getPermissions('reservation_staff');
        if (count($reservationStaffPerms) > 1 || !in_array('manage_reservations', $reservationStaffPerms)) {
            $issues[] = 'Reservation Staff should only have manage_reservations permission';
        }

        // Analyst should only have reports permission
        $analystPerms = $this->getPermissions('analyst');
        if (count($analystPerms) > 1 || !in_array('manage_reports', $analystPerms)) {
            $issues[] = 'Analyst should only have manage_reports permission';
        }

        return $issues;
    }

    protected function getAllPermissions(): array
    {
        $all = [];
        foreach ($this->roles as $role) {
            $all = array_merge($all, $role['permissions']);
        }
        return array_unique($all);
    }
}
