'use babel';

import YoutubeAndChill from '../lib/youtube-and-chill';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('YoutubeAndChill', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('youtube-and-chill');
  });

  describe('when the youtube-and-chill:enterURL event is triggered', () => {
    it('hides and shows the modal panel which allows to input URL', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.youtube-and-chill')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'youtube-and-chill:enterURL');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.youtube-and-chill')).toExist();

        let youtubeAndChillElement = workspaceElement.querySelector('.youtube-and-chill');
        expect(youtubeAndChillElement).toExist();

        let youtubeAndChillPanel = atom.workspace.panelForItem(youtubeAndChillElement);
        expect(youtubeAndChillPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'youtube-and-chill:enterURL');
        expect(youtubeAndChillPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.youtube-and-chill')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'youtube-and-chill:enterURL');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let youtubeAndChillElement = workspaceElement.querySelector('.youtube-and-chill');
        expect(youtubeAndChillElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'youtube-and-chill:enterURL');
        expect(youtubeAndChillElement).not.toBeVisible();
      });
    });
  });
});
