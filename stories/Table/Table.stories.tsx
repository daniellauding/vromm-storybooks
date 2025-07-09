import type { Meta, StoryObj } from '@storybook/react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableCell, 
  TableHeaderCell,
  TableActions,
  TableStatusBadge,
  TableImageCell
} from '../../src/components/Table/Table';
import { Button } from '../../src/components/Button/Button';
import { Badge } from '../../src/components/Badge/Badge';
import { Avatar } from '../../src/components/Avatar/Avatar';
import { Edit, Trash2, Eye, MoreHorizontal, User, Mail, Phone } from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof Table> = {
  title: 'Data Display/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive table component with support for admin features like row selection, expandable rows, action menus, and status indicators.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

// Basic Table
export const BasicTable: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Role</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>Developer</TableCell>
          <TableCell>
            <TableStatusBadge status="active" variant="success" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>Designer</TableCell>
          <TableCell>
            <TableStatusBadge status="pending" variant="warning" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob Johnson</TableCell>
          <TableCell>bob@example.com</TableCell>
          <TableCell>Manager</TableCell>
          <TableCell>
            <TableStatusBadge status="inactive" variant="error" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

// Admin Table with All Features
export const AdminTable: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [expandedRows, setExpandedRows] = useState<string[]>([]);

    const users = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Developer',
        status: 'active',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        joinDate: '2023-01-15',
        lastSeen: '2 hours ago',
        phone: '+1 (555) 123-4567',
        department: 'Engineering'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'Designer',
        status: 'pending',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
        joinDate: '2023-02-20',
        lastSeen: '1 day ago',
        phone: '+1 (555) 987-6543',
        department: 'Design'
      },
      {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        role: 'Manager',
        status: 'inactive',
        avatar: null,
        joinDate: '2022-11-10',
        lastSeen: '1 week ago',
        phone: '+1 (555) 456-7890',
        department: 'Operations'
      }
    ];

    const handleSelectAll = (selected: boolean) => {
      setSelectedRows(selected ? users.map(u => u.id) : []);
    };

    const handleSelectRow = (id: string, selected: boolean) => {
      setSelectedRows(prev => 
        selected 
          ? [...prev, id]
          : prev.filter(rowId => rowId !== id)
      );
    };

    const handleExpandRow = (id: string, expanded: boolean) => {
      setExpandedRows(prev => 
        expanded 
          ? [...prev, id]
          : prev.filter(rowId => rowId !== id)
      );
    };

    const getStatusVariant = (status: string) => {
      switch (status) {
        case 'active': return 'success';
        case 'pending': return 'warning';
        case 'inactive': return 'error';
        default: return 'default';
      }
    };

    const userActions = [
      {
        id: 'edit',
        label: 'Edit User',
        icon: <Edit size={16} />,
        onClick: () => alert('Edit user'),
      },
      {
        id: 'view',
        label: 'View Details',
        icon: <Eye size={16} />,
        onClick: () => alert('View details'),
      },
      {
        id: 'delete',
        label: 'Delete User',
        icon: <Trash2 size={16} />,
        onClick: () => alert('Delete user'),
        variant: 'destructive' as const,
      },
    ];

    return (
      <div className="space-y-4">
        {selectedRows.length > 0 && (
          <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
            <span className="text-sm text-blue-700">
              {selectedRows.length} row(s) selected
            </span>
            <Button size="sm" variant="primary">
              Bulk Action
            </Button>
          </div>
        )}
        
        <Table variant="admin">
          <TableHeader>
            <TableRow>
              <TableHeaderCell width="50px"></TableHeaderCell>
              <TableHeaderCell 
                checkbox
                onSelectAll={handleSelectAll}
                allSelected={selectedRows.length === users.length}
                someSelected={selectedRows.length > 0 && selectedRows.length < users.length}
              />
              <TableHeaderCell>User</TableHeaderCell>
              <TableHeaderCell>Contact</TableHeaderCell>
              <TableHeaderCell>Role</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Last Seen</TableHeaderCell>
              <TableHeaderCell width="100px">Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                id={user.id}
                expandable
                expanded={expandedRows.includes(user.id)}
                onExpand={(expanded) => handleExpandRow(user.id, expanded)}
                selectable
                selected={selectedRows.includes(user.id)}
                onSelect={(selected) => handleSelectRow(user.id, selected)}
                expandedContent={
                  <div className="grid grid-cols-2 gap-4 p-4">
                    <div>
                      <h4 className="font-medium mb-2">Contact Information</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail size={14} />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={14} />
                          <span>{user.phone}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Details</h4>
                      <div className="space-y-1 text-sm">
                        <div><strong>Department:</strong> {user.department}</div>
                        <div><strong>Join Date:</strong> {user.joinDate}</div>
                      </div>
                    </div>
                  </div>
                }
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={user.avatar}
                      fallback={user.name.charAt(0)}
                      size="sm"
                    />
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{user.email}</div>
                    <div className="text-gray-500">{user.phone}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" size="sm">
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <TableStatusBadge 
                    status={user.status} 
                    variant={getStatusVariant(user.status)} 
                  />
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-500">{user.lastSeen}</span>
                </TableCell>
                <TableCell>
                  <TableActions actions={userActions} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
};

// Products Table with Images
export const ProductsTable: Story = {
  render: () => {
    const products = [
      {
        id: '1',
        name: 'MacBook Pro',
        description: 'Apple MacBook Pro 14-inch',
        image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=100&h=100&fit=crop',
        price: '$1,999',
        stock: 15,
        category: 'Laptops',
        status: 'in_stock'
      },
      {
        id: '2',
        name: 'iPhone 15',
        description: 'Latest Apple iPhone',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop',
        price: '$899',
        stock: 0,
        category: 'Phones',
        status: 'out_of_stock'
      },
      {
        id: '3',
        name: 'AirPods Pro',
        description: 'Wireless earbuds with ANC',
        price: '$249',
        stock: 8,
        category: 'Audio',
        status: 'low_stock'
      }
    ];

    const getStockStatus = (stock: number) => {
      if (stock === 0) return { label: 'Out of Stock', variant: 'error' as const };
      if (stock < 10) return { label: 'Low Stock', variant: 'warning' as const };
      return { label: 'In Stock', variant: 'success' as const };
    };

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Product</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell align="right">Price</TableHeaderCell>
            <TableHeaderCell align="center">Stock</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell width="100px">Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            const stockStatus = getStockStatus(product.stock);
            
            return (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <TableImageCell
                      src={product.image}
                      alt={product.name}
                      fallback={<User size={16} />}
                    />
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.description}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" size="sm">
                    {product.category}
                  </Badge>
                </TableCell>
                <TableCell align="right" variant="numeric">
                  <span className="font-medium">{product.price}</span>
                </TableCell>
                <TableCell align="center">
                  {product.stock}
                </TableCell>
                <TableCell>
                  <TableStatusBadge 
                    status={stockStatus.label} 
                    variant={stockStatus.variant}
                  />
                </TableCell>
                <TableCell>
                  <TableActions
                    actions={[
                      {
                        id: 'edit',
                        label: 'Edit Product',
                        icon: <Edit size={16} />,
                        onClick: () => alert('Edit product'),
                      },
                      {
                        id: 'delete',
                        label: 'Delete Product',
                        icon: <Trash2 size={16} />,
                        onClick: () => alert('Delete product'),
                        variant: 'destructive',
                      },
                    ]}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  },
};

// Sortable Table
export const SortableTable: Story = {
  render: () => {
    const [sortField, setSortField] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const handleSort = (field: string) => {
      if (sortField === field) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortField(field);
        setSortDirection('asc');
      }
    };

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell 
              sortable
              sorted={sortField === 'name' ? sortDirection : false}
              onSort={() => handleSort('name')}
            >
              Name
            </TableHeaderCell>
            <TableHeaderCell 
              sortable
              sorted={sortField === 'email' ? sortDirection : false}
              onSort={() => handleSort('email')}
            >
              Email
            </TableHeaderCell>
            <TableHeaderCell 
              sortable
              sorted={sortField === 'joinDate' ? sortDirection : false}
              onSort={() => handleSort('joinDate')}
              align="right"
            >
              Join Date
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice Johnson</TableCell>
            <TableCell>alice@example.com</TableCell>
            <TableCell align="right">2023-01-15</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob Smith</TableCell>
            <TableCell>bob@example.com</TableCell>
            <TableCell align="right">2023-02-20</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Charlie Brown</TableCell>
            <TableCell>charlie@example.com</TableCell>
            <TableCell align="right">2023-03-10</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  },
}; 