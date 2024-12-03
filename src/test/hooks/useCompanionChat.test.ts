import { renderHook, act } from '@testing-library/react-hooks';
import { useCompanionChat } from '../../hooks/useCompanionChat';
import { SocketProvider } from '../../contexts/SocketContext';
import { Server } from 'socket.io';

describe('useCompanionChat', () => {
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

  it('should send and receive messages', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SocketProvider>{children}</SocketProvider>
    );

    const { result } = renderHook(() => useCompanionChat(), { wrapper });

    await act(async () => {
      await result.current.sendMessage('Hello companion!');
    });

    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].text).toBe('Hello companion!');
    expect(result.current.messages[0].sender).toBe('user');
  });

  it('should clear chat history', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SocketProvider>{children}</SocketProvider>
    );

    const { result } = renderHook(() => useCompanionChat(), { wrapper });

    await act(async () => {
      await result.current.sendMessage('Test message');
      result.current.clearChat();
    });

    expect(result.current.messages).toHaveLength(0);
  });
});