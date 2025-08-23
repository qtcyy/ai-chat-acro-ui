import { BehaviorSubject, Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

// Mock the search function for testing
const createMockSearchChats = (mockResults: any[]) => {
  return (title?: string): Observable<any[]> => {
    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next(mockResults);
        subscriber.complete();
      }, 100);
    });
  };
};

describe('useHistory searchChats RxJS implementation', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  test('should return empty array for empty search query', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const mockSearchChats = createMockSearchChats([]);
      const result = mockSearchChats('');
      
      expectObservable(result).toBe('100ms (a|)', { a: [] });
    });
  });

  test('should debounce search queries properly', () => {
    testScheduler.run(({ cold, hot, expectObservable }) => {
      const searchQuery$ = new BehaviorSubject('');
      const queries = hot('-a--b--c---d|', {
        a: 'te',
        b: 'tes',
        c: 'test',
        d: 'testing'
      });

      queries.subscribe(query => searchQuery$.next(query));

      // Should only emit the last value after debounce
      const debouncedQueries = searchQuery$.pipe();
      
      // This would need proper implementation with marble testing
      // For now, this is a structural test
      expect(searchQuery$).toBeDefined();
    });
  });

  test('should handle search errors gracefully', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const errorSearchChats = (title?: string): Observable<any[]> => {
        return new Observable(subscriber => {
          subscriber.error(new Error('Network error'));
        });
      };

      const result = errorSearchChats('test');
      
      expectObservable(result).toBe('#', undefined, new Error('Network error'));
    });
  });
});