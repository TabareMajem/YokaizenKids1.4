import { renderHook, act } from '@testing-library/react-hooks';
import { useRealTimeUpdates } from '../../hooks/useRealTimeUpdates';
import { SocketProvider } from '../../contexts/SocketContext';
import { AuthProvider } from '../../contexts/AuthContext';
import { Server } from 'socket.io';

describe('useRealTimeUpdates', () => {
  let io: Server;
  let clientSocket: any;

  beforeAll((done) => {
    io = new Server(3001);
    clientSocket = io.connect();
    done();
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  it('should receive and manage notifications', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>
        <SocketProvider>{children}</SocketProvider>
      </AuthProvider>
    );

    const { result } = renderHook(() => useRealTimeUpdates(), { wrapper });

    // Simulate receiving a journal update
    act(() => {
      clientSocket.emit('journal:update', {
        studentId: '123',
        journalId: '456',
        type: 'new_entry'
      });
    });

    expect(result.current.notifications).toHaveLength(1);
    expect(result.current.notifications[0].type).toBe('journal');

    // Test clearing notifications
    act(() => {
      result.current.clearNotifications();
    });

    expect(result.current.notifications).toHaveLength(0);
  });

  it('should remove individual notifications', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>
        <SocketProvider>{children}</SocketProvider>
      </AuthProvider>
    );

    const { result } = renderHook(() => useRealTimeUpdates(), { wrapper });

    // Add multiple notifications
    act(() => {
      clientSocket.emit('journal:update', { id: '1' });
      clientSocket.emit('milestone:complete', { id: '2' });
    });

    expect(result.current.notifications).toHaveLength(2);

    // Remove first notification
    act(() => {
      result.current.removeNotification(0);
    });

    expect(result.current.notifications).toHaveLength(1);
    expect(result.current.notifications[0].type).toBe('milestone');
  });
});