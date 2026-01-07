import React, { useEffect, useState } from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Plus } from 'lucide-react';
import { fetchUsers } from '../../services/admin/userManagement.service';

// New Components
import UserActionsMenu from '../../components/UserActionsMenu';
import UserDetailsModal from '../../components/UserDetailsModal';
import EditUserModal from '../../components/EditUserModal';
import DeactivateUserDialog from '../../components/DeactivateUserDialog';
import UserActivityModal from '../../components/UserActivityModal';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Actions State
    const [selectedUser, setSelectedUser] = useState(null);
    const [activeAction, setActiveAction] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (error) {
                console.error("Failed to load users", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleAction = (actionType, user) => {
        if (actionType === 'activate') {
            handleActivateUser(user.id);
        } else {
            setSelectedUser(user);
            setActiveAction(actionType);
        }
    };

    const closeAction = () => {
        setSelectedUser(null);
        setActiveAction(null);
    };

    // Stub handlers for future API integration
    const handleSaveUser = (updatedUser) => {
        console.log("Saving user:", updatedUser);
        // Optimistic UI update
        setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    };

    const handleDeactivateUser = (userId) => {
        console.log("Deactivating user:", userId);
        // Optimistic UI update
        setUsers(users.map(u => u.id === userId ? { ...u, status: 'Inactive' } : u));
    };

    const handleActivateUser = (userId) => {
        console.log("Activating user:", userId);
        // Optimistic UI update
        setUsers(users.map(u => u.id === userId ? { ...u, status: 'Active' } : u));
    };

    if (loading) {
        return <div className="p-6">Loading users...</div>;
    }

    const getStatusVariant = (status) => {
        switch (status) {
            case 'Active': return 'success';
            case 'Offline': return 'secondary';
            case 'Inactive': return 'default';
            default: return 'outline';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                </Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Organization</TableHead>
                                <TableHead>Status</TableHead>
                                {/* <TableHead>Last Active</TableHead> */}
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <img src={user.avatar} alt="" className="h-8 w-8 rounded-full" />
                                            <div>
                                                <p className="font-medium text-gray-900">{user.name}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="capitalize">
                                            {user.role.replace('_', ' ')}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-gray-500">{user.organization}</TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusVariant(user.status)}>{user.status}</Badge>
                                    </TableCell>
                                    {/* <TableCell className="text-gray-500">{user.lastActive}</TableCell> */}
                                    <TableCell className="text-right">
                                        <UserActionsMenu user={user} onAction={handleAction} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Modals */}
            <UserDetailsModal
                user={selectedUser}
                isOpen={activeAction === 'view'}
                onClose={closeAction}
            />

            <EditUserModal
                user={selectedUser}
                isOpen={activeAction === 'edit'}
                onClose={closeAction}
                onSave={handleSaveUser}
            />

            <DeactivateUserDialog
                user={selectedUser}
                isOpen={activeAction === 'deactivate'}
                onClose={closeAction}
                onConfirm={handleDeactivateUser}
            />

            <UserActivityModal
                userId={selectedUser?.id}
                isOpen={activeAction === 'activity'}
                onClose={closeAction}
            />
        </div>
    );
};

export default UserManagement;

